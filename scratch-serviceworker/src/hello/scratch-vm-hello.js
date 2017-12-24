const ScratchVM = require("scratch-vm");
const ScratchRender = require("scratch-render");
const ScratchStorage = require("scratch-storage");
const ScratchAudio = require("scratch-audio");


const canvas = document.getElementById('scratch-stage');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');

const vm = new ScratchVM();
const renderer = new ScratchRender(canvas);
const storage = new ScratchStorage();
const audioEngine = new ScratchAudio();


//
// Assets Setting
//
const ASSET_SERVER = '';
const PROJECT_SERVER = '';
const getProjectUrl = function (asset) {
        console.log(JSON.stringify(asset));
    const assetUrlParts = [PROJECT_SERVER, '/project/', asset.assetId, '.json'];
    return assetUrlParts.join('');
};

const getAssetUrl = function (asset) {
    console.log(JSON.stringify(asset));
    const assetUrlParts = [ASSET_SERVER, '/project/', asset.assetId, '.', asset.dataFormat];
    return assetUrlParts.join('');
};
storage.addWebSource([storage.AssetType.Project], getProjectUrl);
storage.addWebSource([storage.AssetType.ImageVector, storage.AssetType.ImageBitmap, storage.AssetType.Sound], getAssetUrl);
vm.attachStorage(storage);


//
// Render Setting
//
vm.attachRenderer(renderer);


//
// Audio Setting
//
vm.attachAudioEngine(audioEngine);


//
// START & Download
//
vm.start();
vm.downloadProjectId("195233767");

//
// Button Action Setting
//
startButton.onclick = function() {
	vm.greenFlag();
};

stopButton.onclick = function() {
	vm.stopAll();
};


