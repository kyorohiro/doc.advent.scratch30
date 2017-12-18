const storage = require('./scratch-storage.js');

console.log(JSON.stringify(storage.AssetType.Project));
var storageObj = new storage();

//console.log(storageObj);

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

storageObj.addWebSource([storage.AssetType.Project], getProjectUrl);
storageObj.addWebSource([storage.AssetType.ImageVector, storage.AssetType.ImageBitmap, storage.AssetType.Sound], getAssetUrl);


var id = '119615668';
const promise = storageObj.load(storage.AssetType.Project, id);
promise.then(projectAsset => {
 return projectAsset.decodeText();
}).then(jsonSrc =>{
//    console.log(jsonSrc);
    var jsonObj = JSON.parse(jsonSrc);
    console.log(JSON.stringify(jsonObj));
    /*
    for(var item in jsonObj) {
        console.log("# " + item);
        if(jsonObj.hasOwnProperty(item)) {
            for(var i in item) {
                console.log(item[i]);
            }
        }
    }*/
});
