
const data = req.body;
const blobData = {
    "account": "",//please add here your Azure blob account name
    "container": "",//please add here your Azure blob container name
    "accountKey": "",//please add here your Azure blob access account key 
    "blobName": "",
    "contentType": "",
    "metadata": { user: data.name },
    "buffer": {}
}

const url = `https://${blobData.account}.blob.core.windows.net/${blobData.container}/`


if (blobData.account !== "") { // Azure Blob provided 
const azureblob = globals.Upload;
    try {
        let matchesBlobImg = data.image.match(/^data:([A-Za-z-+\/]+)\/([A-Za-z-+\/]+);base64,(.+)$/);

        blobData.blobName = data.app + "/" + data.deviceID + "/" + Date.now();
        blobData.buffer = new Buffer.from(matchesBlobImg[3], 'base64');
        blobData.contentType = matchesBlobImg[1] + "/" + matchesBlobImg[2];

        const validFile = globals.AllowedFileTypes.check(blobData.buffer);
        if (!validFile) {
            log.error("Only upload of images is allowed!!"); 
            result.statusCode = 500;
            result.data = {
                msg: "Only upload of images is allowed!!" 
            };

        } else {
            const ok = azureblob.uploadBlob(blobData);
            if (ok) data.image = url + blobData.blobName;
        }

    } catch (e) {
        log.error("Feedback Blob error: " + e);
        result.data = {
            msg: "Error saving Feedback!"
        };

    };

}

const app = await entities.feedbackfw_main.save(data);
result.data = app;
complete();