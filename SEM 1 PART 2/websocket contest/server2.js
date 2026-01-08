import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./authiddleware.js";
import { usermodel, quizmodel } from "./models.js";
import { URL } from "url";

// Connect to MongoDB
mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/menti");

// WebSocket Server on port 3001
const wss = new WebSocketServer({ port: 3001 });

// Store live quizzes state
// Structure: { quizId: { quizId, title, hostId, currentQuestionIndex, started, questions, users: { userId: { ws, name, score, answeredCurrent } }, answers: { questionId: { userId: selectedOption } } } }
const liveQuizzes = {};

// Helper function to resolve URL parameters
function resolveUrlParams(request) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const token = url.searchParams.get("token");
  const quizId = url.searchParams.get("quizId");
  return { token, quizId };
}

// Helper function to verify JWT token and get user info
async function verifyTokenAndGetUser(token, quizId) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await usermodel.findOne({ _id: decoded._id });
    if (!user) {
      return { success: false, error: "User not found" };
    }
    return {
      success: true,
      userId: decoded._id,
      role: decoded.role,
      userName: user.name,
    };
  } catch (error) {
    return { success: false, error: "Invalid or expired token" };
  }
}

// Helper function to get quiz data
async function getQuizData(quizId) {
  try {
    const quiz = await quizmodel.findOne({ _id: quizId });
    if (!quiz) {
      return { success: false, error: "Quiz not found" };
    }
    return { success: true, quiz };
  } catch (error) {
    return { success: false, error: "Error fetching quiz" };
  }
}

// Helper function to send error message
function sendError(ws, message) {
  ws.send(JSON.stringify({
    type: "ERROR",
    success: false,
    message: message
  }));
}

// Helper function to initialize live quiz if not exists
function initializeLiveQuiz(quizId, quizData, hostId) {
  if (!liveQuizzes[quizId]) {
    liveQuizzes[quizId] = {
      quizId: quizId,
      title: quizData.title,
      hostId: hostId,
      currentQuestionIndex: null,
      started: false,
      questions: quizData.questions || [],
      users: {},
      answers: {}
    };
  }
}

// Handle WebSocket connections
wss.on("connection", async (ws, request) => {
  // Resolve token and quizId from URL
  const { token, quizId } = resolveUrlParams(request);

  // Validate token and quizId
  if (!token || !quizId) {
    sendError(ws, "Missing token or quizId in query parameters");
    ws.close();
    return;
  }

  // Verify token and get user info
  const userInfo = await verifyTokenAndGetUser(token, quizId);
  if (!userInfo.success) {
    sendError(ws, userInfo.error || "Unauthorized or invalid token");
    ws.close();
    return;
  }

  const { userId, role, userName } = userInfo;

  // Get quiz data
  const quizResult = await getQuizData(quizId);
  if (!quizResult.success) {
    sendError(ws, quizResult.error || "Quiz not found");
    ws.close();
    return;
  }

  const quizData = quizResult.quiz;

  // Initialize live quiz if it doesn't exist
  initializeLiveQuiz(quizId, quizData, role === "admin" ? userId : null);

  const liveQuiz = liveQuizzes[quizId];
  
  // Set hostId if admin connects and hostId is not set
  if (role === "admin" && !liveQuiz.hostId) {
    liveQuiz.hostId = userId;
  }

  // Add user to live quiz
  liveQuiz.users[userId] = {
    ws: ws,
    name: userName,
    role: role,
    score: 0,
    answeredCurrent: false
  };

  // Send connection success message
  ws.send(JSON.stringify({
    type: "CONNECTED",
    success: true,
    quizId: quizId,
    role: role,
    message: "Successfully connected to quiz"
  }));

  // Handle incoming messages
  ws.on("message", async (data) => {
    try {
      const message = JSON.parse(data.toString());

      // Admin-only actions
      if (role === "admin") {
        // START_QUIZ
        if (message.type === "START_QUIZ") {
          if (message.quizId !== quizId) {
            sendError(ws, "Invalid quizId");
            return;
          }
          liveQuiz.started = true;
          liveQuiz.currentQuestionIndex = null;

          // Notify all users
          Object.values(liveQuiz.users).forEach(user => {
            user.ws.send(JSON.stringify({
              type: "QUIZ_STARTED",
              quizId: quizId,
              message: "Quiz is now live"
            }));
          });
        }
        // SHOW_QUESTION
        else if (message.type === "SHOW_QUESTION") {
          if (message.quizId !== quizId) {
            sendError(ws, "Invalid quizId");
            return;
          }

          const questionId = message.questionId;
          const question = liveQuiz.questions.find(q => q._id.toString() === questionId);

          if (!question) {
            sendError(ws, "Question not found");
            return;
          }

          // Set current question index
          liveQuiz.currentQuestionIndex = liveQuiz.questions.findIndex(q => q._id.toString() === questionId);
          
          // Reset answeredCurrent for all users
          Object.values(liveQuiz.users).forEach(user => {
            user.answeredCurrent = false;
          });

          // Initialize answers for this question
          if (!liveQuiz.answers[questionId]) {
            liveQuiz.answers[questionId] = {};
          }

          // Send question to all students
          Object.values(liveQuiz.users).forEach(user => {
            if (user.ws.readyState === 1) { // WebSocket.OPEN
              user.ws.send(JSON.stringify({
                type: "SHOW_QUESTION",
                quizId: quizId,
                questionId: questionId,
                text: question.text,
                options: question.options
              }));
            }
          });
        }
        // END_QUESTION
        else if (message.type === "END_QUESTION") {
          if (message.quizId !== quizId) {
            sendError(ws, "Invalid quizId");
            return;
          }

          const questionId = message.questionId;
          const question = liveQuiz.questions.find(q => q._id.toString() === questionId);

          if (!question) {
            sendError(ws, "Question not found");
            return;
          }

          // Calculate scores for this question
          const correctOptionIndex = question.correctOptionIndex;
          const answers = liveQuiz.answers[questionId] || {};

          Object.keys(answers).forEach(userId => {
            if (answers[userId] === correctOptionIndex) {
              liveQuiz.users[userId].score += 1;
            }
          });

          // Send END_QUESTION to all users
          Object.values(liveQuiz.users).forEach(user => {
            if (user.ws.readyState === 1) {
              user.ws.send(JSON.stringify({
                type: "END_QUESTION",
                quizId: quizId,
                questionId: questionId,
                correctOptionIndex: correctOptionIndex
              }));
            }
          });
        }
        // SHOW_LEADERBOARD
        else if (message.type === "SHOW_LEADERBOARD") {
          if (message.quizId !== quizId) {
            sendError(ws, "Invalid quizId");
            return;
          }

          // Get leaderboard sorted by score
          const leaderboard = Object.values(liveQuiz.users)
            .filter(user => user.role !== "admin")
            .map(user => ({
              name: user.name,
              score: user.score
            }))
            .sort((a, b) => b.score - a.score);

          // Send to all users
          Object.values(liveQuiz.users).forEach(user => {
            if (user.ws.readyState === 1) {
              user.ws.send(JSON.stringify({
                type: "SHOW_LEADERBOARD",
                quizId: quizId,
                leaderboard: leaderboard
              }));
            }
          });
        }
        else {
          sendError(ws, "Invalid message type for admin");
        }
      }
      // Student-only actions
      else if (role === "student") {
        // SUBMIT_ANSWER
        if (message.type === "SUBMIT_ANSWER") {
          if (message.quizId !== quizId) {
            sendError(ws, "Invalid quizId");
            return;
          }

          if (!liveQuiz.started) {
            sendError(ws, "Quiz has not started yet");
            return;
          }

          if (liveQuiz.currentQuestionIndex === null) {
            sendError(ws, "No question is currently active");
            return;
          }

          const questionId = message.questionId;
          const selectedOptionIndex = message.selectedOptionIndex;

          // Verify that the questionId matches the current question
          const currentQuestion = liveQuiz.questions[liveQuiz.currentQuestionIndex];
          if (!currentQuestion || currentQuestion._id.toString() !== questionId) {
            sendError(ws, "Question ID does not match the current active question");
            return;
          }

          const question = liveQuiz.questions.find(q => q._id.toString() === questionId);

          if (!question) {
            sendError(ws, "Question not found");
            return;
          }

          if (selectedOptionIndex < 0 || selectedOptionIndex >= question.options.length) {
            sendError(ws, "Invalid option index");
            return;
          }

          // Check if user already answered
          if (liveQuiz.users[userId].answeredCurrent) {
            sendError(ws, "You have already answered this question");
            return;
          }

          // Store answer
          if (!liveQuiz.answers[questionId]) {
            liveQuiz.answers[questionId] = {};
          }
          liveQuiz.answers[questionId][userId] = selectedOptionIndex;
          liveQuiz.users[userId].answeredCurrent = true;

          // Send confirmation
          ws.send(JSON.stringify({
            type: "ANSWER_SUBMITTED",
            success: true,
            quizId: quizId,
            questionId: questionId,
            selectedOptionIndex: selectedOptionIndex
          }));
        }
        else {
          sendError(ws, "Invalid message type for student");
        }
      }
      else {
        sendError(ws, "Invalid role");
      }
    } catch (error) {
      sendError(ws, "Invalid message format or error processing message");
      console.error("Error processing message:", error);
    }
  });

  // Handle connection close
  ws.on("close", () => {
    // Remove user from live quiz
    if (liveQuizzes[quizId] && liveQuizzes[quizId].users[userId]) {
      delete liveQuizzes[quizId].users[userId];
    }

    // Clean up empty quizzes
    if (liveQuizzes[quizId] && Object.keys(liveQuizzes[quizId].users).length === 0) {
      delete liveQuizzes[quizId];
    }
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log("WebSocket server running on port 3001");

