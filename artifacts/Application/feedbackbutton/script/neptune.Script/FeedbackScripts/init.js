


sap.ui.getCore().attachInit(function (startParams) {

    if (sap.ui.getCore().byId("nepFeedback") === undefined) {

        if (startParams?.distance_from_bottom) {
            Nepfeedback.CSSdefault.distance_from_bottom = startParams.distance_from_bottom;
        }
        if (startParams?.distance_from_right) {
            Nepfeedback.CSSdefault.distance_from_right = startParams.distance_from_right;
        }
        if (startParams?.size) {
            Nepfeedback.CSSdefault.size = startParams.size;
        }
        if (startParams?.color) {
            Nepfeedback.CSSdefault.color = startParams.color;
        }

        var nepFeedback = new sap.m.Button("nepFeedback", {
            icon: "sap-icon://feedback",
            press: function () {
                if(appShell){
                    appShell.setBusy(true);
                }
                
                Nepfeedback.resetLayout();
                Nepfeedback.generateImage();
            }
        })
        nepFeedback.addStyleClass("neptFBFloating");
        nepFeedback.placeAt("body");


// This is the CSS that makes the button float, it's possible to adjust the position, colour and size by changing the values in the object Nepfeedback.CSSdefault
        var oHTMLFeedback = new sap.ui.core.HTML("oHTMLFeedback", {});
        let CSS = ".neptFBFloating { position: absolute; bottom: " + Nepfeedback.CSSdefault.distance_from_bottom + "; right: " + Nepfeedback.CSSdefault.distance_from_right + "; z-index: 99; } " +
            ".neptFBFloating .sapMBtnIcon { line-height: " + parseFloat(Nepfeedback.CSSdefault.size) * 2.5 + "px; font-size: " + Nepfeedback.CSSdefault.size + "; color: " + Nepfeedback.CSSdefault.color + ";} " +
            ".neptFBFloating .sapMBtnInner { height: " + parseFloat(Nepfeedback.CSSdefault.size) * 2.5 + "px; width: " + parseFloat(Nepfeedback.CSSdefault.size) * 2.5 + "px; border-radius: " + parseFloat(Nepfeedback.CSSdefault.size) * 2.5 + "px; border: solid; border-color: " + Nepfeedback.CSSdefault.color + "; background: none;} " +
            ".neptFBTransparent .sapMPanelContent:not(.sapMPanelBGTransparent) { border-bottom: none; } " +
            ".neptFBTransparent .sapMPanelBGTransparent { background-color: transparent !important; } " +
            ".neptFBNoScroll .sapMPanelContent { overflow: hidden !important; background: transparent; } " +
            ".neptFBHideScrollBar section { overflow: hidden; } " +
            ".neptFBimgFeedback { max-width: 100%; max-height: 100%; } " +
            ".neptFBFooter { flex-direction: row-reverse; border: none; } " +
            ".neptFBFooter .sapMITH { box-shadow: none; } ";

        oHTMLFeedback.setDOMContent("<style id='FeedbackCSS'> " + CSS + "</style>");
        oHTMLFeedback.placeAt("body");

    }
});
