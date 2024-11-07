let oSignaturePad; // Declare globally

const Nepfeedback = {
    CSSdefault: {
        distance_from_bottom: "40px",
        distance_from_right: "40px",
        size: "24px",
        color: "rgb(235, 176, 67)", // Using RGB format as a string
    },
    originalWidth: null,
    originalHeigth: null,
    originalImage: null,
    recognition: null,
    dontShowPopover: false,
    changedImage: false,
    changedComment: false,
    currentApp: "",

    // Method to convert the feedback container to an image
    generateImage: function () {
        console.log("Starting image generation with dom-to-image...");

        // Define the specific element or section to capture, e.g., #feedbackContainer
        const captureTarget = document.getElementById("feedbackContainer") || document.body;

        // Use dom-to-image to capture the element
        domtoimage.toJpeg(captureTarget, { quality: 0.95, bgcolor: 'white' })
            .then(function (dataUrl) {
                // Handle the captured image data URL
                oImageFeedback.setSrc(dataUrl); // Set as feedback image source
                Nepfeedback.originalImage = dataUrl;
                Nepfeedback.originalWidth = captureTarget.offsetWidth;
                Nepfeedback.originalHeigth = captureTarget.offsetHeight;
                oDialogFeedback.open();

                if (appShell) {
                    appShell.setBusy(false);
                }
            })
            .catch(function (error) {
                console.error("An error occurred during image generation with dom-to-image:", error);
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

        oSignaturePad._canvas.height = oHBoxContainer.getDomRef().clientHeight - 4;
        oSignaturePad._canvas.width = oHBoxContainer.getDomRef().clientWidth - 4;

        oSignaturePad.penColor = `rgba(0,255,0,1)`; // Explicit color assignment
        oSignaturePad.maxWidth = 1;
        oSignaturePad.minWidth = 1;

        oSignaturePad.clear();

        let size = Nepfeedback.adjustSize();
        if (size.width !== "") {
            oSignaturePad._canvas.height = size.height;
            oSignaturePad._canvas.width = size.width;
        } else {
            oSignaturePad._canvas.height = Nepfeedback.originalHeigth;
            oSignaturePad._canvas.width = Nepfeedback.originalWidth;
        }

        if (Nepfeedback.originalImage) {
            oSignaturePad.fromDataURL(Nepfeedback.originalImage);
        }
    },

    adjustSize: function () {
        let out = { width: "", height: "" };
        let percentage;

        if (Nepfeedback.originalWidth > oSignaturePad._canvas.width) {
            percentage = oSignaturePad._canvas.width / Nepfeedback.originalWidth;
            out.width = Nepfeedback.originalWidth * percentage;
            out.height = Nepfeedback.originalHeigth * percentage;
        }

        if (
            (out.height && out.height > oSignaturePad._canvas.height) ||
            (!out.height && Nepfeedback.originalHeigth > oSignaturePad._canvas.height)
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
                throw "not supported";
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
                let transcript = event.results[0][0].transcript;
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
        };
        Object.assign(feedback, $.os);
        Object.assign(feedback, $.device.is);

        let options = { data: feedback };
        apiFeedbackSent(options);
        return true;
    },

    getCurrentApp: function () {
        Nepfeedback.currentApp = AppCache ? AppCache.CurrentApp : localAppID;
    },
};

// Ensure color is logged to troubleshoot potential issues
console.log("CSSdefault color:", Nepfeedback.CSSdefault.color);
console.log("SignaturePad color:", oSignaturePad ? oSignaturePad.penColor : "SignaturePad not initialized");


