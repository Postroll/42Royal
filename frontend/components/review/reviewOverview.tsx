interface IReview{
    setReview: Function,
}

export default function ReviewOverview({setReview}: IReview){
    return (
        <div className="flex flex-col items-center gap-32 p-20">
            <div className="flex text-white font-bold text-4xl">Review code!</div>
            <div className="flex flex-col text-white text-2xl text-center gap-12">
                Help the project grow by reviewing the code other people submitted
                <div className="text-lg">
                    <p className="text-xl">What do you need to do?</p>
                    <ul className="">
                        <li>Make sure all the fields were correctly filled and that the description is clear.</li>
                        <li>Test on your end that the given expected output matches the stdin</li>
                        <li>Submit suggested modification if possible or reject the problem if you find something wrong</li>
                    </ul>
                </div>
            </div>
            <button type="button"
                className={`hover:bg-purple-800 text-white bg-purple-700
                font-semibold hover:text-white py-2 px-4 hover:border-white 
                border-transparent rounded-lg transition-all duration-300
                active:animate-shrink`}
                onClick={() => setReview(true)}>
                    Start Reveiwing!
            </button>
        </div>
    )
}