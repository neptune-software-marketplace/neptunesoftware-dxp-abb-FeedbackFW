const report = {
    metadata: metadata,
    initId: null,
    formObject: null,
    pages: {},

    events: {
        onChildBack: function () {
            oApp.back();
        },
        onNavigatePage: function (page) {
            if (!report.pages[page.sId]) oApp.addPage(page);
            report.childPage = page;
            report.pages[page.sId] = true;
            oApp.to(page);
        },
    },

    start: function () {
        if (!sap.n.Adaptive) {
            console.error('Neptune Adaptive Framework not found');
            return;
        }

        sap.n.Adaptive.initApp(this);
    },

    init: function (config, runtime) {
        // Set Default Values
        sap.n.Adaptive.setDefaultData(config, metadata);

        // Reset when config changes
        if (report.initId !== config.id) report.initId = config.id;

        // Language 
        if (runtime) {
            if (AppCache && AppCache.userInfo && AppCache.userInfo.language) config.language = AppCache.userInfo.language;
        } else {
            if (toolMenuTranslation.getSelectedKey()) config.language = toolMenuTranslation.getSelectedKey();
        }

        modelAppConfig.setData(config);
        modelAppConfig.refresh();

        oApp.setBusy(true);

        if (config.settings.properties.report.avatarBackgroundColor) {
            oPageHeaderIcon.setBackgroundColor(config.settings.properties.report.avatarBackgroundColor);
        } else {
            oPageHeaderIcon.setBackgroundColor();
        }

        const classNepFormInput = 'nepFormInput';

        if (config.settings.properties.form.enableCentered) {
            panMain.addStyleClass(classNepFormInput);
            panItemMain.addStyleClass(classNepFormInput);
        } else {
            panMain.removeStyleClass(classNepFormInput);
            panItemMain.removeStyleClass(classNepFormInput);
        }

        // // Sidepanel - Moved to close button properties
        // if (config.settings.navigation && config.settings.navigation.openAs === 'S') {
        //     toolHeaderBack.setVisible(false);
        // }

        // Translation - Properties
        oPageHeaderTitle.setText(sap.n.Adaptive.translateProperty('report', 'title', config));
        oPageHeaderSubTitle.setText(sap.n.Adaptive.translateProperty('report', 'subTitle', config));
        toastSaved.setText(sap.n.Adaptive.translateProperty('report', 'textToastSave', config));
        toolHeaderBack.setText(sap.n.Adaptive.translateProperty('report', 'textButtonClose', config));
        toolHeaderSave.setText(sap.n.Adaptive.translateProperty('report', 'textButtonSave', config));

        barEditItemMain.setText(sap.n.Adaptive.translateProperty('report', 'tab0Text', config));
        barEditItem1.setText(sap.n.Adaptive.translateProperty('report', 'tab1Text', config));
        barEditItem2.setText(sap.n.Adaptive.translateProperty('report', 'tab2Text', config));
        barEditItem3.setText(sap.n.Adaptive.translateProperty('report', 'tab3Text', config));
        barEditItem4.setText(sap.n.Adaptive.translateProperty('report', 'tab4Text', config));
        barEditItem5.setText(sap.n.Adaptive.translateProperty('report', 'tab5Text', config));

        // Init
        sap.n.Adaptive.init(modelAppConfig.oData).then(function (data) {
            const s = modelAppConfig.oData.settings;
            const r = s.properties.report;

            if (runtime) {
                s.fieldsSel = data.fieldsSelection;
                s.fieldsRun = data.fieldsReport;

                // Fields Sorting
                if (s.fieldsSel) s.fieldsSel.sort(sort_by('fieldPos'));
                if (s.fieldsRun) s.fieldsRun.sort(sort_by('fieldPos'));
            } else {
                s.fieldsSel.forEach(function (selField) {
                    let selFieldRun = ModelData.FindFirst(data.fieldsSelection, 'name', selField.name);
                    if (selFieldRun && selFieldRun.items) selField.items = selFieldRun.items;
                    if (selFieldRun && selFieldRun.default) selField.default = selFieldRun.default;
                });
            }

            // Form Fields
            if (r.enableTab1 || r.enableTab2 || r.enableTab3 || r.enableTab4 || r.enableTab5) {
                barEdit.setSelectedItem(barEditItemMain);
                barEdit.setVisible(true);
                panMain.setVisible(false);
                report.buildForm(panItemMain, modelAppConfig.oData, {}, report.events);
                report.formObject = panItemMain.getContent();
            } else {
                barEdit.setVisible(false);
                panMain.setVisible(true);
                report.buildForm(panMain, modelAppConfig.oData, {}, report.events);
                report.formObject = panMain.getContent();
            }

            // New Record ? 
            if (s.data && s.data._defaultData) {
                report.afterRun(s.data._defaultData);
            } else {
                // Key Fields for GET Record 
                if (s.navigation && s.navigation.keyField && s.navigation.keyField.length) {
                    s.data._keyField = s.navigation.keyField;
                }

                sap.n.Adaptive.run(modelAppConfig.oData, s.data, 'Get').then(function (data) {
                    report.afterRun(data);
                });
            }

            // Tabs
            if (r._tab1Nav) {
                report.openChild(r._tab1Nav, barEditItem1);
            } else {
                barEditItem1.destroyContent();
                barEditItem1.setCount();
            }

            if (r._tab2Nav) {
                report.openChild(r._tab2Nav, barEditItem2);
            } else {
                barEditItem2.destroyContent();
                barEditItem2.setCount();
            }

            if (r._tab3Nav) {
                report.openChild(r._tab3Nav, barEditItem3);
            } else {
                barEditItem3.destroyContent();
                barEditItem3.setCount();
            }

            if (r._tab4Nav) {
                report.openChild(r._tab4Nav, barEditItem4);
            } else {
                barEditItem4.destroyContent();
                barEditItem4.setCount();
            }

            if (r._tab5Nav) {
                report.openChild(r._tab5Nav, barEditItem5);
            } else {
                barEditItem5.destroyContent();
                barEditItem5.setCount();
            }
        }).catch(function (data) {
            if (data.responseJSON && data.responseJSON.status) sap.m.MessageToast.show(data.responseJSON.status);
            if (data.status === 0) sap.m.MessageToast.show('No connection');
            oApp.setBusy(false);
        });
    },

    afterRun: function (data) {
        // Open Dialog
        if (oApp.getParent() && oApp.getParent().getParent() && oApp.getParent().getParent().open) oApp.getParent().getParent().open();

        // Data Preprocessing
        modelAppConfig.oData.settings.fieldsSel.forEach(function (field) {
            const { name, type } = field;

            // Date Format
            if (['DatePicker', 'DateTimePicker'].includes(type)) if (data[name]) data[name] = sap.n.Adaptive.getDate(data[name]);

            // Editor 
            if (type === 'Editor') {
                field._editor.setData(data[name]);
                field._editor.onChange = function (data) {
                    modelAppData.oData[name] = data;
                }
            }

            // Default Value
            if (field.default && !data[name]) {
                data[name] = ['Switch', 'CheckBox'].includes(type) ? true : field.default;
            }

            // MultiSelect Parser
            if (['MultiSelectLookup', 'MultiSelectScript'].includes(type)) {
                try {
                    let keyString = data[name];

                    // CASTANA Contribution
                    if (keyString) {
                        if (keyString.length > 0 && keyString.substr(0, 1) === '{') {
                            const keyValues = keyString.substr(1, keyString.length - 2);
                            const keyJSON = `[${keyValues}]`;
                            const keyArray = JSON.parse(keyJSON);
                            data[name] = keyArray;
                        }

                        let dataArray = data[name].split(',');
                        if (dataArray.length > 0) data[name] = dataArray;
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        });

        modelAppData.setData(data);
        modelAppData.refresh();

        oApp.setBusy(false);

        // // Any Input Fields ? 
        // if (report.formObject.length > 0) {

        //     var simpleForm = report.formObject[0];
        //     var foundFocus = false;

        // simpleForm.getContent().forEach(function (field) {
        //     if (!foundFocus) {
        //         var metaData = field.getMetadata();
        //         if (metaData._sClassName === 'sap.m.Input' && field.getEditable()) {
        //             foundFocus = true;
        //             setTimeout(function () {
        //                 field.focus();
        //             }, 350);
        //         }
        //     }
        // });
        // }
    },

    save: function () {
        toolHeaderSave.setEnabled(false);

        const s = modelAppConfig.oData.settings;
        const saveData = {
            id: modelAppData.oData.id
        };

        // Format Data for Boolean
        s.fieldsSel.forEach(function (f) {
            if (['Switch', 'CheckBox'].includes(f.type)) {
                if (!modelAppData.oData[f.name]) modelAppData.oData[f.name] = false;
            }

            if (f.editable) saveData[f.name] = modelAppData.oData[f.name];
        });

        sap.n.Adaptive
            .run(modelAppConfig.oData, saveData, 'Save')
            .then(function (data) {
                if (data.status && data.status === 'required') {
                    sap.m.MessageToast.show('Please fill in all required fields');
                } else {
                    sap.m.MessageToast.show(toastSaved.getText());
                    if (oApp.getParent() && oApp.getParent().getParent() && oApp.getParent().getParent().close) oApp.getParent().getParent().close();
                    if (s.events && s.events.afterChildSave) s.events.afterChildSave();
                }

                modelAppData.refresh();
            })
            .catch(function (data) {
                const j = data.responseJSON;
                if (j && j.status) {
                    if (
                        (
                            j.status.indexOf('UNIQUE constraint failed') > -1 ||
                            j.status.indexOf('duplicate key value') > -1
                        ) && s.properties.report.textUnique
                    ) {
                        sap.m.MessageToast.show(sap.n.Adaptive.translateProperty('report', 'textUnique', modelAppConfig.oData));
                    } else {
                        sap.m.MessageToast.show(j.status);
                    }
                }
            })
            .finally(function () {
                setTimeout(function () {
                    toolHeaderSave.setEnabled(true);
                }, 1000);
            });
    },

    close: function () {
        const s = modelAppConfig.oData.settings;
        if (oApp.getParent() && oApp.getParent().getParent() && oApp.getParent().getParent().close) {
            oApp.getParent().getParent().close();
        } else if (s.events && s.events.onChildBack) {
            s.events.onChildBack();
        } else if (
            sap.n.Shell && sap.n.Shell.closeTile &&
            sap.n.Launchpad && sap.n.Launchpad.currentTile && sap.n.Launchpad.currentTile.id
        ) {
            sap.n.Shell.closeTile(sap.n.Launchpad.currentTile);
        }
    },

    openChild: function (navigation, child) {
        const s = modelAppConfig.oData.settings;
        if (navigation.destinationType === 'F') {
            sap.n.Adaptive.getConfig(navigation.destinationTargetF).then(function (config) {
                if (!config) return;

                config.settings.navigation = navigation;
                config.settings.data = s.data;

                if (config.settings.data && navigation.keyField) config.settings.data._keyField = navigation.keyField;

                AppCache.Load(config.application, {
                    appGUID: ModelData.genID(),
                    startParams: config,
                    parentObject: child
                });
            });
        } else {
            let startParams = {};
            if (s && s.data) startParams.data = JSON.parse(JSON.stringify(s.data));

            AppCache.Load(navigation.destinationTargetA, {
                appGUID: ModelData.genID(),
                startParams: startParams,
                parentObject: child
            });
        }
    },

    buildForm: function (parent, config, appdata, events) {

        try {

            parent.destroyContent();

            var form = new sap.ui.layout.form.SimpleForm({
                layout: "ResponsiveGridLayout",
                editable: true,
                columnsL: parseInt(config.settings.properties.form.columnsL) || 2,
                columnsM: parseInt(config.settings.properties.form.columnsM) || 1,
                labelSpanL: parseInt(config.settings.properties.form.labelSpanL) || 4,
                labelSpanM: parseInt(config.settings.properties.form.labelSpanM) || 2,
                backgroundDesign: "Transparent"
            });

            if (config.settings.properties.form.enableCompact) {
                form.addStyleClass("sapUiSizeCompact");
            } else {
                form.removeStyleClass("sapUiSizeCompact");
            }

            // Selection Fields
            $.each(config.settings.fieldsSel, function (i, field) {

                // Trigger new form
                if (field.enableNewForm) {

                    parent.addContent(form);

                    form = new sap.ui.layout.form.SimpleForm({
                        layout: "ResponsiveGridLayout",
                        editable: true,
                        columnsL: parseInt(field.columnsL) || 2,
                        columnsM: parseInt(field.columnsM) || 1,
                        labelSpanL: parseInt(field.labelSpanL) || 4,
                        labelSpanM: parseInt(field.labelSpanM) || 2,
                    });

                }

                if (field.columnLabel) form.addContent(new sap.ui.core.Title({
                    text: field.columnLabel,
                    level: config.settings.properties.form.titleLevel || "Auto"
                }));

                switch (field.type) {

                    case "Editor":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.FlexBox({
                            height: field.editorHeight || "400px",
                            renderType: "Bare",
                            width: "100%",
                            visible: field.visible,
                        });

                        try {
                            sap.n.Adaptive.editor(newField, {});
                        } catch (e) {
                            console.log(e);
                        }

                        field._editor = newField.editor;
                        field._editor.setEditable(field.editable);

                        form.addContent(newField);

                        if (field.default) newField.setState(field.default);
                        break;

                    case "DatePicker":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.DatePicker({
                            visible: field.visible,
                            editable: field.editable,
                            valueState: "{AppData>/" + field.name + "ValueState}",
                            dateValue: "{AppData>/" + field.name + "}"
                        });
                        form.addContent(newField);
                        break;

                    case "DateTimePicker":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.DateTimePicker({
                            visible: field.visible,
                            editable: field.editable,
                            secondsStep: parseInt(field.dateTimePickerSecondsStep) || 1,
                            minutesStep: parseInt(field.dateTimePickerMinutesStep) || 1,
                            valueState: "{AppData>/" + field.name + "ValueState}",
                            dateValue: "{AppData>/" + field.name + "}",
                        });
                        form.addContent(newField);
                        break;

                    case "CheckBox":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.CheckBox({
                            visible: field.visible,
                            editable: field.editable,
                            valueState: "{AppData>/" + field.name + "ValueState}",
                            selected: "{AppData>/" + field.name + "}"
                        });
                        form.addContent(newField);
                        break;

                    case "Switch":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.Switch({
                            visible: field.visible,
                            enabled: field.editable,
                            state: "{AppData>/" + field.name + "}"
                        });
                        form.addContent(newField);
                        break;

                    case "MultiSelect":
                    case "MultiSelectLookup":
                    case "MultiSelectScript":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        newField = new sap.m.MultiComboBox({
                            width: "100%",
                            visible: field.visible,
                            selectedKeys: "{AppData>/" + field.name + "}",
                            placeholder: field.placeholder || "",
                            valueState: "{AppData>/" + field.name + "ValueState}",
                            showSecondaryValues: true
                        });

                        if (field.items) field.items.sort(sort_by("text"));

                        $.each(field.items, function (i, item) {
                            newField.addItem(new sap.ui.core.ListItem({ key: item.key, text: item.text, additionalText: item.additionalText }));
                        });

                        form.addContent(newField);
                        break;

                    case "SingleSelect":
                    case "SingleSelectLookup":
                    case "SingleSelectScript":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.ComboBox({
                            width: "100%",
                            visible: field.visible,
                            editable: field.editable,
                            placeholder: field.placeholder || "",
                            selectedKey: "{AppData>/" + field.name + "}",
                            valueState: "{AppData>/" + field.name + "ValueState}",
                            showSecondaryValues: true
                        });
                        form.addContent(newField);

                        newField.addItem(new sap.ui.core.Item({ key: "", text: "", }));

                        if (field.items) field.items.sort(sort_by("text"));

                        $.each(field.items, function (i, item) {
                            newField.addItem(new sap.ui.core.ListItem({ key: item.key, text: item.text, additionalText: item.additionalText }));
                        });
                        break;

                    case "TextArea":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.TextArea({
                            visible: field.visible,
                            editable: field.editable,
                            rows: parseInt(field.textAreaRows) || 2,
                            placeholder: field.placeholder || "",
                            valueState: "{AppData>/" + field.name + "ValueState}",
                            value: "{AppData>/" + field.name + "}",
                            width: "100%"
                        });
                        form.addContent(newField);
                        break;


                    case "ValueHelp":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.Input({
                            visible: field.visible,
                            editable: field.editable,
                            type: field.inputType || "Text",
                            placeholder: field.placeholder || "",
                            valueState: "{AppData>/" + field.name + "ValueState}",
                            value: "{AppData>/" + field.name + "}",
                            showValueHelp: true,
                            valueHelpRequest: function (oEvent) {
                                events.valueRequest = true;
                                events.valueRequestField = newField.sId;
                                events.valueRequestKey = field.valueRequestKey;
                                sap.n.Adaptive.navigation(field._navigation, appdata, events);
                            }

                        });
                        form.addContent(newField);
                        break;

                    case "Image":
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.Image({
                            visible: field.visible,
                            src: "{AppData>/" + field.name + "}",
                            height: field.imageH || "100%",
                            width: field.imageW || "100%",
                            press: function (oEvent) {
                                window.open(this.getSrc());
                            }
                        });
                        
                        newField.addStyleClass('nepDynamicImage');

                        if(!field.pressEvent){
                            newField.detachPress(newField.mEventRegistry.press[0].fFunction);
                        }

                        form.addContent(newField);
                        break;

                    default:
                        form.addContent(new sap.m.Label({ text: sap.n.Adaptive.translateFieldLabel(field, config), required: field.required }));

                        var newField = new sap.m.Input({
                            visible: field.visible,
                            editable: field.editable,
                            type: field.inputType || "Text",
                            placeholder: field.placeholder || "",
                            valueState: "{AppData>/" + field.name + "ValueState}",
                            value: "{AppData>/" + field.name + "}"
                        });

                        form.addContent(newField);
                        break;

                }

            });

            parent.addContent(form);

        } catch (e) {
            console.log(e);
        }

    }

}

report.start();