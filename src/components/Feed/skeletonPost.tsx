export default function skeletonPost() {
    return (
        <>
            <div className="px-4 py-6 bg-white shadow sm:p-6">
                <div>
                    <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="w-2/5 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-2/5 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex self-center flex-shrink-0">
                            <div className="relative inline-block text-left">
                                <div>
                                    <div className="w-6 h-6 bg-gray-200 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 space-y-2">

                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex flex-row-reverse justify-between mt-6 space-x-8">
                    <div className="flex space-x-6">
                        <span className="inline-flex items-center text-sm">
                            <div className="inline-flex space-x-2">
                                <div className="w-10 h-4 bg-gray-200 animate-pulse"></div>
                                <span className="w-8 h-4 bg-gray-200 animate-pulse"></span><span className="sr-only">Likes</span>
                            </div>
                        </span>
                        <span className="inline-flex items-center text-sm">
                            <div className="inline-flex space-x-2">
                                <div className="w-10 h-4 bg-gray-200 animate-pulse"></div>
                                <span className="w-8 h-4 bg-gray-200 animate-pulse"></span><span className="sr-only">Comments</span>
                            </div>
                        </span>
                    </div>
                    <div className="flex text-sm">
                        <span className="inline-flex items-center text-sm">
                            <div className="inline-flex space-x-2">
                                <div className="w-10 h-4 bg-gray-200 animate-pulse"></div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

        </>
    );
}