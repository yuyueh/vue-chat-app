<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-between">
            <div>
                <div class="p-6 font-bold cursor-pointer inline-block cursor">
                    首頁
                </div>
                <div class="p-6 font-bold cursor-pointer inline-block cursor">
                    本日話題
                </div>
                <div class="p-6 font-bold inline-block border-b-4 border-blue-800">
                    偷偷說
                </div>
            </div>
            <div class="p-6 bg-blue-800 border-b-4 border-blue-800 text-white">
                測試一
            </div>
        </div>
        <div class="relative bg-purple-400 font-bold py-3 text-center cursor-pointer">
            最近掏寶辦1111慶祝，有推薦的店家嗎?
            <span class="absolute text-white right-0 px-3"><i class="fas fa-sort-down"></i></span>
        </div>
        <div class="flex-grow overflow-y-auto">
            <div class="container mx-auto border-red p-3 text-left">
                <div class="pb-2 text-red-600">name</div>
                <p class="inline-block border border-red-600 rounded-b-lg rounded-tr-lg p-3">
                    sadfj;saljf;lsajf;lsajfd;lj saf safs fd safdj;lsdj;lkjfd;
                </p>
            </div>
            <div class="container mx-auto border-green p-3 text-right">
                <div class="pb-2 text-green-600">name</div>
                <p class="inline-block bg-green-600 text-white rounded-b-lg rounded-tl-lg p-3">
                    sadfj;saljf;lsajf;lsajfd;lj saf safs fd safdj;lsdj;lkjfd;
                </p>
            </div>
            <div class="container mx-auto border-red p-3 text-left">
                <div class="pb-2 text-red-600">name</div>
                <p class="inline-block border border-red-600 rounded-b-lg rounded-tr-lg p-3">
                    sadfj;saljf;lsajf;lsajfd;lj saf safs fd safdj;lsdj;lkjfd;
                </p>
            </div>
            <div class="container mx-auto border-green p-3 text-right">
                <div class="pb-2 text-green-600">name</div>
                <p class="inline-block bg-green-600 text-white rounded-b-lg rounded-tl-lg p-3">
                    sadfj;saljf;lsajf;lsajfd;lj saf safs fd safdj;lsdj;lkjfd;
                </p>
            </div>
            <div class="container mx-auto border-red p-3 text-left">
                <div class="pb-2 text-red-600">name</div>
                <p class="inline-block border border-red-600 rounded-b-lg rounded-tr-lg p-3">
                    sadfj;saljf;lsajf;lsajfd;lj saf safs fd safdj;lsdj;lkjfd;
                </p>
            </div>
            <div class="container mx-auto border-red p-3 text-left">
                <div class="pb-2 text-red-600">name</div>
                <img
                    class="w-1/3 py-5 px-24 cursor-pointer inline-block"
                    src="../assets/images/sticker1.png"
                    alt=""
                />
            </div>
            <div class="container mx-auto border-green p-3 text-right">
                <div class="pb-2 text-green-600">name</div>
                <img
                    class="w-1/3 py-5 px-24 cursor-pointer inline-block"
                    src="../assets/images/sticker1.png"
                    alt=""
                />
            </div>
            <div class="container mx-auto border-green p-3 text-right">
                <div class="pb-2 text-green-600">name</div>
                <p class="inline-block bg-green-600 text-white rounded-b-lg rounded-tl-lg p-3">
                    sadfj;saljf;lsajf;lsajfd;lj saf safs fd safdj;lsdj;lkjfd;
                </p>
            </div>
            <div class="container mx-auto border-red p-3 text-left">
                <div class="pb-2 text-red-600">name</div>
                <p class="inline-block border border-red-600 rounded-b-lg rounded-tr-lg p-3">
                    sadfj;saljf;lsajf;lsajfd;lj saf safs fd safdj;lsdj;lkjfd;
                </p>
            </div>
        </div>
        <div class="border-t-4 border-gray-200">
            <div class="flex container mx-auto">
                <div class="p-5 cursor-pointer">
                    <i class="far fa-images"></i>
                </div>
                <div class="p-5 cursor-pointer">
                    <i class="far fa-smile-beam"></i>
                </div>
                <div class="py-5 flex-grow">
                    <input class="w-full border-2 border-black rounded" type="text" />
                </div>
                <div class="p-5 cursor-pointer">
                    <i class="fas fa-location-arrow"></i>
                </div>
            </div>
        </div>
        <!-- <div class="flex flex-wrap overflow-y-auto">
            <img
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="./assets/images/sticker1.png"
                alt=""
            />
            <img
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="./assets/images/sticker2.png"
                alt=""
            />
            <img
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="./assets/images/sticker3.png"
                alt=""
            />
            <img
                class="w-1/3 py-5 px-24 cursor-pointer"
                src="./assets/images/sticker4.png"
                alt=""
            />
        </div> -->
    </div>
</template>
