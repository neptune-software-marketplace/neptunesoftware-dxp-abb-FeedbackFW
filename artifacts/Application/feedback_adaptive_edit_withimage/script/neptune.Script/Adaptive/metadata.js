const vb = {
    reportEnableTab1: "{= ${appData>/settings/properties/report/enableTab1} ? true : false }",
    reportEnableTab2: "{= ${appData>/settings/properties/report/enableTab2} ? true : false }",
    reportEnableTab3: "{= ${appData>/settings/properties/report/enableTab3} ? true : false }",
    reportEnableTab4: "{= ${appData>/settings/properties/report/enableTab4} ? true : false }",
    reportEnableTab5: "{= ${appData>/settings/properties/report/enableTab5} ? true : false }",

    enableTab0: "{= ${appData>/settings/properties/report/enableTab1} || ${appData>/settings/properties/report/enableTab2} || ${appData>/settings/properties/report/enableTab3} || ${appData>/settings/properties/report/enableTab4} || ${appData>/settings/properties/report/enableTab5} ? true : false }",

    type: "{= ${/type} ? false : true }",
    editor: "{= ${/type} === 'Editor' ? true : false }",
    textArea: "{= ${/type} === 'TextArea' ? true : false }",
    valueHelp: "{= ${/type} === 'ValueHelp' ? true : false }",
    dateTimePicker: "{= ${/type} === 'DateTimePicker' ? true : false }",
    multiOrSingleSelectLookup: "{= ${/type} === 'MultiSelectLookup' || ${/type} === 'SingleSelectLookup' ? true : false }",
    placeholder: "{= ${/type} === 'CheckBox'  || ${/type} === 'DatePicker' || ${/type} === 'DateTimePicker' || ${/type} === 'Editor' || ${/type} === 'Switch' ? false : true }",
};

const metadata = {
    properties: {
        docLink: 'https://community.neptune-software.com/documentation/adaptive-template-edit',
        enableForm: true,
        enableTable: true,
        titleForm: 'Form',
        titleTable: 'Field Mapping',
        iconForm: '/public/icons/s_vwform.gif',
        iconTable: '/public/icons/s_psrela.gif',

        report: {
            titleGeneral: { type: 'Title', label: 'General' },
            title: { type: 'Input', label: 'Title', translate: true },
            subTitle: { type: 'Input', label: 'Sub Title', translate: true },
            avatarIcon: { type: 'Icon', label: 'Icon' },
            avatarBackgroundColor: {
                type: 'SingleSelect',
                label: 'Icon Color',
                items: valuesToKeyText(['', 'Accent1', 'Accent2', 'Accent3', 'Accent4', 'Accent5', 'Accent6', 'Accent7', 'Accent8', 'Accent9', 'Accent10', 'Random']),
            },
            showIcon: { type: 'CheckBox', label: 'Icon Visible', default: true },

            textGeneral: { type: 'Title', label: 'Texts' },
            textUnique: { type: 'Input', label: 'Unique Error', translate: true },

            titleButtonClose: { type: 'Title', label: 'Button Close' },
            iconButtonClose: { type: 'Icon', label: 'Icon', default: '' },
            textButtonClose: { type: 'Input', label: 'Text', default: 'Close', translate: true },
            typeButtonClose: {
                type: 'SingleSelect',
                label: 'Type',
                default: 'Transparent',
                items: valuesToKeyText(['Accept', 'Back', 'Default', 'Emphasized', 'Reject', 'Transparent', 'Unstyled', 'Up']),
            },

            titleButtonSave: { type: 'Title', label: 'Button Save' },
            iconButtonSave: { type: 'Icon', label: 'Icon', default: '' },
            textButtonSave: { type: 'Input', label: 'Text', default: 'Save', translate: true },
            textToastSave: { type: 'Input', label: 'Message', default: 'Saved', translate: true },
            typeButtonSave: { type: 'SingleSelect', label: 'Type', default: 'Emphasized', items: valuesToKeyText(['Accept', 'Back', 'Default', 'Emphasized', 'Reject', 'Transparent', 'Unstyled', 'Up']), },

            titleTab0: { type: 'Title', label: 'Tab Main', visible: vb.enableTab0 },
            tab0Text: { type: 'Input', label: 'Text', default: 'General', visible: vb.enableTab0, translate: true },
            tab0Icon: { type: 'Icon', label: 'Icon', visible: vb.enableTab0 },

            titleTab1: { type: 'Title', label: 'Tab 1', visible: vb.reportEnableTab1 },
            tab1Text: { type: 'Input', label: 'Text', default: 'Tab 1', visible: vb.reportEnableTab1, translate: true },
            tab1Icon: { type: 'Icon', label: 'Icon', visible: vb.reportEnableTab1 },
            tab1Nav: { type: 'NavigationChild', label: 'Child', visible: vb.reportEnableTab1 },

            titleTab2: { type: 'Title', label: 'Tab 2', visible: vb.reportEnableTab2 },
            tab2Text: { type: 'Input', label: 'Text', default: 'Tab 2', visible: vb.reportEnableTab2, translate: true },
            tab2Icon: { type: 'Icon', label: 'Icon', visible: vb.reportEnableTab2 },
            tab2Nav: { type: 'NavigationChild', label: 'Child', visible: vb.reportEnableTab2 },

            titleTab3: { type: 'Title', label: 'Tab 3', visible: vb.reportEnableTab3 },
            tab3Text: { type: 'Input', label: 'Text', default: 'Tab 3', visible: vb.reportEnableTab3, translate: true },
            tab3Icon: { type: 'Icon', label: 'Icon', visible: vb.reportEnableTab3 },
            tab3Nav: { type: 'NavigationChild', label: 'Child', visible: vb.reportEnableTab3 },

            titleTab4: { type: 'Title', label: 'Tab 4', visible: vb.reportEnableTab4 },
            tab4Text: { type: 'Input', label: 'Text', default: 'Tab 4', visible: vb.reportEnableTab4, translate: true },
            tab4Icon: { type: 'Icon', label: 'Icon', visible: vb.reportEnableTab4 },
            tab4Nav: { type: 'NavigationChild', label: 'Child', visible: vb.reportEnableTab4 },

            titleTab5: { type: 'Title', label: 'Tab 5', visible: vb.reportEnableTab5 },
            tab5Text: { type: 'Input', label: 'Text', default: 'Tab 5', visible: vb.reportEnableTab5, translate: true },
            tab5Icon: { type: 'Icon', label: 'Icon', visible: vb.reportEnableTab5 },
            tab5Nav: { type: 'NavigationChild', label: 'Child', visible: vb.reportEnableTab5 },

            titleProperties: { type: 'Title', label: 'Properties' },
            enableClose: { type: 'CheckBox', label: 'Enable Close', default: true },
            enableSave: { type: 'CheckBox', label: 'Enable Save', default: true },
            enableTab1: { type: 'CheckBox', label: 'Enable Tab 1', default: false },
            enableTab2: { type: 'CheckBox', label: 'Enable Tab 2', default: false },
            enableTab3: { type: 'CheckBox', label: 'Enable Tab 3', default: false },
            enableTab4: { type: 'CheckBox', label: 'Enable Tab 4', default: false },
            enableTab5: { type: 'CheckBox', label: 'Enable Tab 5', default: false },
        },

        form: {
            titleLayout: { type: 'Title', label: 'Layout' },
            columnsL: {
                type: 'SingleSelect',
                label: 'Columns L',
                items: valuesToKeyText(['', '1', '2', '3', '4']),
            },

            columnsM: {
                type: 'SingleSelect',
                label: 'Columns M',
                items: valuesToKeyText(['', '1', '2', '3', '4']),
            },

            labelSpanL: {
                type: 'SingleSelect',
                label: 'LabelSpan L',
                items: valuesToKeyText(['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
            },

            labelSpanM: {
                type: 'SingleSelect',
                label: 'LabelSpan M',
                items: valuesToKeyText(['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
            },

            titleLevel: {
                type: 'SingleSelect',
                label: 'Title Size',
                items: valuesToKeyText(['', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']),
            },

            titleProperties: { type: 'Title', label: 'Properties' },
            enableCompact: { type: 'CheckBox', label: 'Compact Mode', default: false },
            enableCentered: { type: 'CheckBox', label: 'Centered Mode', default: true },
        }
    },

    fieldsSel: {
        titleGeneral: { type: 'Title', label: 'General' },
        text: { type: 'Input', label: 'Label' },
        type: {
            type: 'SingleSelect',
            label: 'Field Type',
            items: valuesToKeyText(['|Input', 'CheckBox', 'DatePicker', 'DateTimePicker', 'Editor', 'MultiSelect', 'MultiSelectLookup', 'SingleSelect', 'SingleSelectLookup', 'Switch', 'TextArea', 'ValueHelp', 'Image']),
        },

        inputType: { type: 'SingleSelect', label: 'Input Type', visible: vb.type, items: valuesToKeyText(['Email', 'Number', 'Password', 'Tel', '|Text', 'Url']), },
        placeholder: { type: 'Input', label: 'Placeholder', visible: vb.placeholder },

        titleValueHelp: { type: 'Title', label: 'ValueHelp Source', visible: vb.valueHelp },
        valueRequestKey: { type: 'Input', label: 'Field to Return', visible: vb.valueHelp },
        navigation: { type: 'Navigation', label: 'Open', visible: vb.valueHelp },

        titleLookup: { type: 'Title', label: 'Data Source', visible: vb.multiOrSingleSelectLookup },
        lookupTable: { type: 'Table', label: 'Table', visible: vb.multiOrSingleSelectLookup },
        lookupFieldKey: { type: 'TableField', label: 'Key Field', visible: vb.multiOrSingleSelectLookup },
        lookupFieldText: { type: 'TableField', label: 'Text Field', visible: vb.multiOrSingleSelectLookup },
        lookupFieldAdditional: { type: 'TableField', label: 'Additional Text Field', visible: vb.multiOrSingleSelectLookup },
        lookupShowOnlyText: { type: 'CheckBox', label: 'Hide Key Field', visible: vb.multiOrSingleSelectLookup },

        titleDefault: { type: 'Title', label: 'Default Value' },
        default: { type: 'Input', label: 'From Value' },
        scriptValue: { type: 'Script', label: 'From Script' },

        titleEditor: { type: 'Title', label: 'Editor', visible: vb.editor },
        editorHeight: { type: 'Input', label: 'Height', visible: vb.editor },

        titleLayout: { type: 'Title', label: 'Layout' },
        columnLabel: { type: 'Input', label: 'Column Title' },
        enableNewForm: { type: 'CheckBox', label: 'Start New Form' },

        columnsL: {
            type: 'SingleSelect',
            label: 'Columns L',
            visible: '{= ${/enableNewForm} ? true: false }',
            items: valuesToKeyText(['', '1', '2', '3', '4']),
        },

        columnsM: {
            type: 'SingleSelect',
            label: 'Columns M',
            visible: '{= ${/enableNewForm} ? true: false }',
            items: valuesToKeyText(['', '1', '2', '3', '4']),
        },

        labelSpanL: {
            type: 'SingleSelect',
            label: 'LabelSpan L',
            visible: '{= ${/enableNewForm} ? true: false }',
            items: valuesToKeyText(['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        },

        labelSpanM: {
            type: 'SingleSelect',
            label: 'LabelSpan M',
            visible: '{= ${/enableNewForm} ? true: false }',
            items: valuesToKeyText(['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        },

        titleTextArea: { type: 'Title', label: 'TextArea', visible: vb.textArea },
        textAreaRows: { type: 'Input', label: 'Rows', visible: vb.textArea, },

        titleImage: { type: 'Title', label: 'Image', visible: vb.image },
        //imageW: { type: 'Input', label: 'Width', visible: vb.imag, },
        //imageH: { type: 'Input', label: 'Height', visible: vb.image},
        pressEvent: { type: 'CheckBox', label: 'Click to open (new Window)', visible: vb.image },

        titleDateTimePicker: { type: 'Title', label: 'DateTimePicker', visible: vb.dateTimePicker },
        dateTimePickerMinutesStep: { type: 'Input', label: 'Step Minutes', visible: vb.dateTimePicker, },
        dateTimePickerSecondsStep: { type: 'Input', label: 'Step Seconds', visible: vb.dateTimePicker, },

        titleSettings: { type: 'Title', label: 'Properties' },
        editable: { type: 'CheckBox', label: 'Editable', default: true },
        required: { type: 'CheckBox', label: 'Required', default: false },
        visible: { type: 'CheckBox', label: 'Visible', default: true }
    },

    fieldsRun: {},
};