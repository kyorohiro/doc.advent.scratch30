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
const ASSET_SERVER = 'https://cdn.assets.scratch.mit.edu/';
const PROJECT_SERVER = 'https://cdn.projects.scratch.mit.edu/';
const getProjectUrl = function (asset) {
    const assetIdParts = asset.assetId.split('.');
    const assetUrlParts = [PROJECT_SERVER, 'internalapi/project/', assetIdParts[0], '/get/'];
    if (assetIdParts[1]) {
        assetUrlParts.push(assetIdParts[1]);
    }
    return assetUrlParts.join('');
};

const getAssetUrl = function (asset) {
    const assetUrlParts = [
        ASSET_SERVER,
        'internalapi/asset/',
        asset.assetId,
        '.',
        asset.dataFormat,
        '/get/'
    ];
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
vm.downloadProjectId("119615668");

//
// Button Action Setting
//
startButton.onclick = function() {
	vm.greenFlag();
};

stopButton.onclick = function() {
	vm.stopAll();
};

