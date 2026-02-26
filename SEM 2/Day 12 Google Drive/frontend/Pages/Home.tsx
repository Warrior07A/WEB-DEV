export function Home() {
    return (
        <>
            <div>
                <div className="h-20 bg-amber-500">
                    NavBar
                </div>
                <div className="flex gap-2 h-screen w-screen" >
                    <div className="w-40 bg-green-700">
                        Sidebar
                    </div>

                    <div className="grow">
                        <div>
                            <button >
                                <input name="file upload" className="border-red-800" type="file" />
                            </button>
                            <button className="bg-green-600 border-amber-400">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home