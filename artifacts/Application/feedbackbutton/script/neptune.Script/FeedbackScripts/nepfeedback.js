
Nepfeedback = {
    CSSdefault: {
        distance_from_bottom: "40px",
        distance_from_right: "40px",
        size: "24px", //24
        color: "#EBB043",
    },
    originalWidth: null,
    originalHeigth: null,
    originalImage: null,
    recognition: null,
    dontShowPopover: false,
    changedImage: false,
    changedComment: false,
    currentApp: "",
    generateImage: function () {
        html2canvas(document.body, {
            useCORS: true,
            removeContainer: true,
            logging: false,
            //imageTimeout: 50000,
            ignoreElements: function (element) {
                if ("nepFeedback" == element.id) return true;
                if ("oDialogFeedback" == element.id) return true;
            },
        })
            .then(function (canvas) {
                oImageFeedback.setSrc(canvas.toDataURL("image/jpeg"));

                Nepfeedback.originalImage = canvas.toDataURL("image/jpeg");
                Nepfeedback.originalWidth = canvas.width;
                Nepfeedback.originalHeigth = canvas.height;
                oDialogFeedback.open();
                if (appShell) {
                    appShell.setBusy(false);
                }
            })
            .catch(function (error) {
                console.error(error);
                if (appShell) {
                    appShell.setBusy(false);
                }
            });
    },
    resetLayout: function () {
        oTextAreaComment.setValue("");
        oImageFeedback.setSrc("");
        Nepfeedback.handleCommentRemovel();
        Nepfeedback.recognition = null;
        Nepfeedback.speechToTextInicialization();
        Nepfeedback.changedComment = false;
        Nepfeedback.changedImage = false;

        if (window.innerWidth < 670) {
            oSplitterLayoutData.setSize("140px");
        } else {
            oSplitterLayoutData.setSize("95px");
        }
    },
    initializeSketch: function () {
        let container = oHBoxContainer.getDomRef();
        let canvas = document.createElement("CANVAS");

        canvas.id = "SignaturePad";
        canvas.className = "signature-pad";
        container.appendChild(canvas);
        oSignaturePad = new SignaturePad(canvas);

        // define the size

        oSignaturePad._canvas.height = oHBoxContainer.getDomRef().clientHeight - 4;
        oSignaturePad._canvas.width = oHBoxContainer.getDomRef().clientWidth - 4;

        // set the colorPicker to black and solid ColorPicker
        // Red
        ColorPicker.Color.r = 0;
        // Green
        ColorPicker.Color.g = 255;
        // Blu
        ColorPicker.Color.b = 0;
        // Transparency
        ColorPicker.Color.a = 1;
        // Set the pencil size to 1
        oSignaturePad.maxWidth = 1;
        oSignaturePad.minWidth = 1;
        oSignaturePad.penColor = "rgb(0,255,0)";

        oSignaturePad.clear();

        let size = Nepfeedback.adjustSize();

        if (size.width !== "") {
            oSignaturePad._canvas.height = size.height;
            oSignaturePad._canvas.width = size.width;
        } else {
            oSignaturePad._canvas.height = Nepfeedback.originalHeigth;
            oSignaturePad._canvas.width = Nepfeedback.originalWidth;
        }

        oSignaturePad.fromDataURL(Nepfeedback.originalImage);
    },
    adjustSize: function () {
        let percentage = "";
        let out = {
            width: "",
            height: "",
        };

        if (Nepfeedback.originalWidth > oSignaturePad._canvas.width) {
            percentage = oSignaturePad._canvas.width / Nepfeedback.originalWidth;
            out.width = Nepfeedback.originalWidth * percentage;
            out.height = Nepfeedback.originalHeigth * percentage;
        }
        if (
            (out.height !== "" && out.height > oSignaturePad._canvas.height) ||
            (out.height === "" && Nepfeedback.originalHeigth > oSignaturePad._canvas.height)
        ) {
            percentage = oSignaturePad._canvas.height / Nepfeedback.originalHeigth;
            out.width = Nepfeedback.originalWidth * percentage;
            out.height = Nepfeedback.originalHeigth * percentage;
        }
        return out;
    },
    speechToTextInicialization: function () {
        try {
            if ("webkitSpeechRecognition" in window) {
                Nepfeedback.recognition = new webkitSpeechRecognition();
            } else if ("SpeechRecognition" in window) {
                Nepfeedback.recognition = new SpeechRecognition();
            } else {
                throw "not suported";
            }

            Nepfeedback.recognition.interimResults = true;
            Nepfeedback.recognition.onstart = function () {
                console.log("We are listening. Try speaking into the microphone.");
            };

            Nepfeedback.recognition.onspeechend = function () {
                Nepfeedback.recognition.stop();
                oButtonVoiceToTextStop.setVisible(false);
                oButtonVoiceToText.setVisible(true);
            };

            Nepfeedback.recognition.onresult = function (event) {
                var transcript = event.results[0][0].transcript;
                oTextAreaComment.setValue(transcript);
                Nepfeedback.changedComment = true;
            };
        } catch (err) {
            console.log("Voice to Text not supported on this browser.");
            oButtonVoiceToText.setType("Reject");
            oButtonVoiceToText.setEnabled(false);
        }
    },

    handleCommentRemovel: function () {
        Nepfeedback.changedComment = false;
    },
    sendFeedback: function () {
        if (!Nepfeedback.changedComment && !Nepfeedback.changedImage) {
            oNUIToast.clone().show();
            return false;
        }

        let feedback = {
            comment: oTextAreaComment.getValue(),
            reportedBy: oInputName.getValue(),
            image: Nepfeedback.originalImage,
            app: Nepfeedback.currentApp,
            //deviceID: //AppStorage.deviceID //"5b865584-28f9-4154-b54c-675563d16dfe",
        };
        Object.assign(feedback, $.os);
        Object.assign(feedback, $.device.is);
        var options = {
            data: feedback,
        };

        apiFeedbackSent(options);
        return true;
    },
    getCurrentApp: function () {
        if (AppCache) {
            Nepfeedback.currentApp = AppCache.CurrentApp;
        } else {
            Nepfeedback.currentApp = localAppID;
        }
    },
};
