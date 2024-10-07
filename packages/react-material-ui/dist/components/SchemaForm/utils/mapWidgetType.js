"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapWidgetType = void 0;
const CustomWidgets_1 = require("../../../styles/CustomWidgets");
const mapWidgetType = (propertyKey, schema, advancedProperties) => {
    const widgetTypes = {
        string: CustomWidgets_1.CustomTextFieldWidget,
        email: CustomWidgets_1.CustomEmailFieldWidget,
        password: CustomWidgets_1.CustomPasswordFieldWidget,
        select: CustomWidgets_1.CustomSelectWidget,
        radio: CustomWidgets_1.CustomRadioWidget,
        checkbox: CustomWidgets_1.CustomCheckboxWidget,
        checkboxes: CustomWidgets_1.CustomCheckboxesWidget,
        switch: CustomWidgets_1.CustomSwitchWidget,
    };
    if (advancedProperties && propertyKey in advancedProperties) {
        return widgetTypes[advancedProperties[propertyKey].type];
    }
    else {
        return;
    }
};
exports.mapWidgetType = mapWidgetType;
//# sourceMappingURL=mapWidgetType.js.map