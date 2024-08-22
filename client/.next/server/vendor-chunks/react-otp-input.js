"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-otp-input";
exports.ids = ["vendor-chunks/react-otp-input"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-otp-input/lib/index.esm.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-otp-input/lib/index.esm.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OTPInput)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar isStyleObject = function (obj) { return typeof obj === 'object' && obj !== null; };\nvar OTPInput = function (_a) {\n    var _b = _a.value, value = _b === void 0 ? '' : _b, _c = _a.numInputs, numInputs = _c === void 0 ? 4 : _c, onChange = _a.onChange, onPaste = _a.onPaste, renderInput = _a.renderInput, _d = _a.shouldAutoFocus, shouldAutoFocus = _d === void 0 ? false : _d, _e = _a.inputType, inputType = _e === void 0 ? 'text' : _e, renderSeparator = _a.renderSeparator, placeholder = _a.placeholder, containerStyle = _a.containerStyle, inputStyle = _a.inputStyle, _f = _a.skipDefaultStyles, skipDefaultStyles = _f === void 0 ? false : _f;\n    var _g = react__WEBPACK_IMPORTED_MODULE_0___default().useState(0), activeInput = _g[0], setActiveInput = _g[1];\n    var inputRefs = react__WEBPACK_IMPORTED_MODULE_0___default().useRef([]);\n    var getOTPValue = function () { return (value ? value.toString().split('') : []); };\n    var isInputNum = inputType === 'number' || inputType === 'tel';\n    react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {\n        inputRefs.current = inputRefs.current.slice(0, numInputs);\n    }, [numInputs]);\n    react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {\n        var _a;\n        if (shouldAutoFocus) {\n            (_a = inputRefs.current[0]) === null || _a === void 0 ? void 0 : _a.focus();\n        }\n    }, [shouldAutoFocus]);\n    var getPlaceholderValue = function () {\n        if (typeof placeholder === 'string') {\n            if (placeholder.length === numInputs) {\n                return placeholder;\n            }\n            if (placeholder.length > 0) {\n                console.error('Length of the placeholder should be equal to the number of inputs.');\n            }\n        }\n        return undefined;\n    };\n    var isInputValueValid = function (value) {\n        var isTypeValid = isInputNum ? !isNaN(Number(value)) : typeof value === 'string';\n        return isTypeValid && value.trim().length === 1;\n    };\n    var handleChange = function (event) {\n        var value = event.target.value;\n        if (isInputValueValid(value)) {\n            changeCodeAtFocus(value);\n            focusInput(activeInput + 1);\n        }\n    };\n    var handleInputChange = function (event) {\n        var nativeEvent = event.nativeEvent;\n        var value = event.target.value;\n        if (!isInputValueValid(value)) {\n            // Pasting from the native autofill suggestion on a mobile device can pass\n            // the pasted string as one long input to one of the cells. This ensures\n            // that we handle the full input and not just the first character.\n            if (value.length === numInputs) {\n                var hasInvalidInput = value.split('').some(function (cellInput) { return !isInputValueValid(cellInput); });\n                if (!hasInvalidInput) {\n                    handleOTPChange(value.split(''));\n                    focusInput(numInputs - 1);\n                }\n            }\n            // @ts-expect-error - This was added previously to handle and edge case\n            // for dealing with keyCode \"229 Unidentified\" on Android. Check if this is\n            // still needed.\n            if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {\n                event.preventDefault();\n                changeCodeAtFocus('');\n                focusInput(activeInput - 1);\n            }\n            // Clear the input if it's not valid value because firefox allows\n            // pasting non-numeric characters in a number type input\n            event.target.value = '';\n        }\n    };\n    var handleFocus = function (event) { return function (index) {\n        setActiveInput(index);\n        event.target.select();\n    }; };\n    var handleBlur = function () {\n        setActiveInput(activeInput - 1);\n    };\n    var handleKeyDown = function (event) {\n        var otp = getOTPValue();\n        if ([event.code, event.key].includes('Backspace')) {\n            event.preventDefault();\n            changeCodeAtFocus('');\n            focusInput(activeInput - 1);\n        }\n        else if (event.code === 'Delete') {\n            event.preventDefault();\n            changeCodeAtFocus('');\n        }\n        else if (event.code === 'ArrowLeft') {\n            event.preventDefault();\n            focusInput(activeInput - 1);\n        }\n        else if (event.code === 'ArrowRight') {\n            event.preventDefault();\n            focusInput(activeInput + 1);\n        }\n        // React does not trigger onChange when the same value is entered\n        // again. So we need to focus the next input manually in this case.\n        else if (event.key === otp[activeInput]) {\n            event.preventDefault();\n            focusInput(activeInput + 1);\n        }\n        else if (event.code === 'Spacebar' ||\n            event.code === 'Space' ||\n            event.code === 'ArrowUp' ||\n            event.code === 'ArrowDown') {\n            event.preventDefault();\n        }\n    };\n    var focusInput = function (index) {\n        var _a, _b;\n        var activeInput = Math.max(Math.min(numInputs - 1, index), 0);\n        if (inputRefs.current[activeInput]) {\n            (_a = inputRefs.current[activeInput]) === null || _a === void 0 ? void 0 : _a.focus();\n            (_b = inputRefs.current[activeInput]) === null || _b === void 0 ? void 0 : _b.select();\n            setActiveInput(activeInput);\n        }\n    };\n    var changeCodeAtFocus = function (value) {\n        var otp = getOTPValue();\n        otp[activeInput] = value[0];\n        handleOTPChange(otp);\n    };\n    var handleOTPChange = function (otp) {\n        var otpValue = otp.join('');\n        onChange(otpValue);\n    };\n    var handlePaste = function (event) {\n        var _a;\n        event.preventDefault();\n        var otp = getOTPValue();\n        var nextActiveInput = activeInput;\n        // Get pastedData in an array of max size (num of inputs - current position)\n        var pastedData = event.clipboardData\n            .getData('text/plain')\n            .slice(0, numInputs - activeInput)\n            .split('');\n        // Prevent pasting if the clipboard data contains non-numeric values for number inputs\n        if (isInputNum && pastedData.some(function (value) { return isNaN(Number(value)); })) {\n            return;\n        }\n        // Paste data from focused input onwards\n        for (var pos = 0; pos < numInputs; ++pos) {\n            if (pos >= activeInput && pastedData.length > 0) {\n                otp[pos] = (_a = pastedData.shift()) !== null && _a !== void 0 ? _a : '';\n                nextActiveInput++;\n            }\n        }\n        focusInput(nextActiveInput);\n        handleOTPChange(otp);\n    };\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { style: Object.assign({ display: 'flex', alignItems: 'center' }, isStyleObject(containerStyle) && containerStyle), className: typeof containerStyle === 'string' ? containerStyle : undefined, onPaste: onPaste }, Array.from({ length: numInputs }, function (_, index) { return index; }).map(function (index) {\n        var _a, _b, _c;\n        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), { key: index },\n            renderInput({\n                value: (_a = getOTPValue()[index]) !== null && _a !== void 0 ? _a : '',\n                placeholder: (_c = (_b = getPlaceholderValue()) === null || _b === void 0 ? void 0 : _b[index]) !== null && _c !== void 0 ? _c : undefined,\n                ref: function (element) { return (inputRefs.current[index] = element); },\n                onChange: handleChange,\n                onFocus: function (event) { return handleFocus(event)(index); },\n                onBlur: handleBlur,\n                onKeyDown: handleKeyDown,\n                onPaste: handlePaste,\n                autoComplete: 'off',\n                'aria-label': \"Please enter OTP character \".concat(index + 1),\n                style: Object.assign(!skipDefaultStyles ? { width: '1em', textAlign: 'center' } : {}, isStyleObject(inputStyle) ? inputStyle : {}),\n                className: typeof inputStyle === 'string' ? inputStyle : undefined,\n                type: inputType,\n                inputMode: isInputNum ? 'numeric' : 'text',\n                onInput: handleInputChange,\n            }, index),\n            index < numInputs - 1 && (typeof renderSeparator === 'function' ? renderSeparator(index) : renderSeparator)));\n    })));\n};\n\n\n//# sourceMappingURL=index.esm.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3Qtb3RwLWlucHV0L2xpYi9pbmRleC5lc20uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBCOztBQUUxQixxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLGFBQWEscURBQWM7QUFDM0Isb0JBQW9CLG1EQUFZO0FBQ2hDLG9DQUFvQztBQUNwQztBQUNBLElBQUksc0RBQWU7QUFDbkI7QUFDQSxLQUFLO0FBQ0wsSUFBSSxzREFBZTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0YsdUNBQXVDO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCw4QkFBOEI7QUFDM0Y7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBbUIsVUFBVSx1QkFBdUIsdUNBQXVDLGtKQUFrSixlQUFlLG1CQUFtQix3QkFBd0IsZUFBZTtBQUNsVTtBQUNBLGdCQUFnQiwwREFBbUIsQ0FBQyx1REFBYyxJQUFJLFlBQVk7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDhDQUE4QztBQUN4RjtBQUNBLDRDQUE0QyxtQ0FBbUM7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxvQ0FBb0MsSUFBSSw2Q0FBNkM7QUFDako7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7O0FBRStCO0FBQy9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3JlYWN0LW90cC1pbnB1dC9saWIvaW5kZXguZXNtLmpzP2RkNmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIGlzU3R5bGVPYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGw7IH07XG52YXIgT1RQSW5wdXQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgX2IgPSBfYS52YWx1ZSwgdmFsdWUgPSBfYiA9PT0gdm9pZCAwID8gJycgOiBfYiwgX2MgPSBfYS5udW1JbnB1dHMsIG51bUlucHV0cyA9IF9jID09PSB2b2lkIDAgPyA0IDogX2MsIG9uQ2hhbmdlID0gX2Eub25DaGFuZ2UsIG9uUGFzdGUgPSBfYS5vblBhc3RlLCByZW5kZXJJbnB1dCA9IF9hLnJlbmRlcklucHV0LCBfZCA9IF9hLnNob3VsZEF1dG9Gb2N1cywgc2hvdWxkQXV0b0ZvY3VzID0gX2QgPT09IHZvaWQgMCA/IGZhbHNlIDogX2QsIF9lID0gX2EuaW5wdXRUeXBlLCBpbnB1dFR5cGUgPSBfZSA9PT0gdm9pZCAwID8gJ3RleHQnIDogX2UsIHJlbmRlclNlcGFyYXRvciA9IF9hLnJlbmRlclNlcGFyYXRvciwgcGxhY2Vob2xkZXIgPSBfYS5wbGFjZWhvbGRlciwgY29udGFpbmVyU3R5bGUgPSBfYS5jb250YWluZXJTdHlsZSwgaW5wdXRTdHlsZSA9IF9hLmlucHV0U3R5bGUsIF9mID0gX2Euc2tpcERlZmF1bHRTdHlsZXMsIHNraXBEZWZhdWx0U3R5bGVzID0gX2YgPT09IHZvaWQgMCA/IGZhbHNlIDogX2Y7XG4gICAgdmFyIF9nID0gUmVhY3QudXNlU3RhdGUoMCksIGFjdGl2ZUlucHV0ID0gX2dbMF0sIHNldEFjdGl2ZUlucHV0ID0gX2dbMV07XG4gICAgdmFyIGlucHV0UmVmcyA9IFJlYWN0LnVzZVJlZihbXSk7XG4gICAgdmFyIGdldE9UUFZhbHVlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gKHZhbHVlID8gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnJykgOiBbXSk7IH07XG4gICAgdmFyIGlzSW5wdXROdW0gPSBpbnB1dFR5cGUgPT09ICdudW1iZXInIHx8IGlucHV0VHlwZSA9PT0gJ3RlbCc7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5wdXRSZWZzLmN1cnJlbnQgPSBpbnB1dFJlZnMuY3VycmVudC5zbGljZSgwLCBudW1JbnB1dHMpO1xuICAgIH0sIFtudW1JbnB1dHNdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmIChzaG91bGRBdXRvRm9jdXMpIHtcbiAgICAgICAgICAgIChfYSA9IGlucHV0UmVmcy5jdXJyZW50WzBdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH0sIFtzaG91bGRBdXRvRm9jdXNdKTtcbiAgICB2YXIgZ2V0UGxhY2Vob2xkZXJWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwbGFjZWhvbGRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlci5sZW5ndGggPT09IG51bUlucHV0cykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGFjZWhvbGRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTGVuZ3RoIG9mIHRoZSBwbGFjZWhvbGRlciBzaG91bGQgYmUgZXF1YWwgdG8gdGhlIG51bWJlciBvZiBpbnB1dHMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHZhciBpc0lucHV0VmFsdWVWYWxpZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgaXNUeXBlVmFsaWQgPSBpc0lucHV0TnVtID8gIWlzTmFOKE51bWJlcih2YWx1ZSkpIDogdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICAgICAgcmV0dXJuIGlzVHlwZVZhbGlkICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPT09IDE7XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlQ2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKGlzSW5wdXRWYWx1ZVZhbGlkKHZhbHVlKSkge1xuICAgICAgICAgICAgY2hhbmdlQ29kZUF0Rm9jdXModmFsdWUpO1xuICAgICAgICAgICAgZm9jdXNJbnB1dChhY3RpdmVJbnB1dCArIDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIG5hdGl2ZUV2ZW50ID0gZXZlbnQubmF0aXZlRXZlbnQ7XG4gICAgICAgIHZhciB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKCFpc0lucHV0VmFsdWVWYWxpZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIFBhc3RpbmcgZnJvbSB0aGUgbmF0aXZlIGF1dG9maWxsIHN1Z2dlc3Rpb24gb24gYSBtb2JpbGUgZGV2aWNlIGNhbiBwYXNzXG4gICAgICAgICAgICAvLyB0aGUgcGFzdGVkIHN0cmluZyBhcyBvbmUgbG9uZyBpbnB1dCB0byBvbmUgb2YgdGhlIGNlbGxzLiBUaGlzIGVuc3VyZXNcbiAgICAgICAgICAgIC8vIHRoYXQgd2UgaGFuZGxlIHRoZSBmdWxsIGlucHV0IGFuZCBub3QganVzdCB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gbnVtSW5wdXRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc0ludmFsaWRJbnB1dCA9IHZhbHVlLnNwbGl0KCcnKS5zb21lKGZ1bmN0aW9uIChjZWxsSW5wdXQpIHsgcmV0dXJuICFpc0lucHV0VmFsdWVWYWxpZChjZWxsSW5wdXQpOyB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0ludmFsaWRJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPVFBDaGFuZ2UodmFsdWUuc3BsaXQoJycpKTtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNJbnB1dChudW1JbnB1dHMgLSAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVGhpcyB3YXMgYWRkZWQgcHJldmlvdXNseSB0byBoYW5kbGUgYW5kIGVkZ2UgY2FzZVxuICAgICAgICAgICAgLy8gZm9yIGRlYWxpbmcgd2l0aCBrZXlDb2RlIFwiMjI5IFVuaWRlbnRpZmllZFwiIG9uIEFuZHJvaWQuIENoZWNrIGlmIHRoaXMgaXNcbiAgICAgICAgICAgIC8vIHN0aWxsIG5lZWRlZC5cbiAgICAgICAgICAgIGlmIChuYXRpdmVFdmVudC5kYXRhID09PSBudWxsICYmIG5hdGl2ZUV2ZW50LmlucHV0VHlwZSA9PT0gJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNoYW5nZUNvZGVBdEZvY3VzKCcnKTtcbiAgICAgICAgICAgICAgICBmb2N1c0lucHV0KGFjdGl2ZUlucHV0IC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgaW5wdXQgaWYgaXQncyBub3QgdmFsaWQgdmFsdWUgYmVjYXVzZSBmaXJlZm94IGFsbG93c1xuICAgICAgICAgICAgLy8gcGFzdGluZyBub24tbnVtZXJpYyBjaGFyYWN0ZXJzIGluIGEgbnVtYmVyIHR5cGUgaW5wdXRcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlRm9jdXMgPSBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBzZXRBY3RpdmVJbnB1dChpbmRleCk7XG4gICAgICAgIGV2ZW50LnRhcmdldC5zZWxlY3QoKTtcbiAgICB9OyB9O1xuICAgIHZhciBoYW5kbGVCbHVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRBY3RpdmVJbnB1dChhY3RpdmVJbnB1dCAtIDEpO1xuICAgIH07XG4gICAgdmFyIGhhbmRsZUtleURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIG90cCA9IGdldE9UUFZhbHVlKCk7XG4gICAgICAgIGlmIChbZXZlbnQuY29kZSwgZXZlbnQua2V5XS5pbmNsdWRlcygnQmFja3NwYWNlJykpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjaGFuZ2VDb2RlQXRGb2N1cygnJyk7XG4gICAgICAgICAgICBmb2N1c0lucHV0KGFjdGl2ZUlucHV0IC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjaGFuZ2VDb2RlQXRGb2N1cygnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBmb2N1c0lucHV0KGFjdGl2ZUlucHV0IC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZm9jdXNJbnB1dChhY3RpdmVJbnB1dCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlYWN0IGRvZXMgbm90IHRyaWdnZXIgb25DaGFuZ2Ugd2hlbiB0aGUgc2FtZSB2YWx1ZSBpcyBlbnRlcmVkXG4gICAgICAgIC8vIGFnYWluLiBTbyB3ZSBuZWVkIHRvIGZvY3VzIHRoZSBuZXh0IGlucHV0IG1hbnVhbGx5IGluIHRoaXMgY2FzZS5cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSBvdHBbYWN0aXZlSW5wdXRdKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZm9jdXNJbnB1dChhY3RpdmVJbnB1dCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdTcGFjZWJhcicgfHxcbiAgICAgICAgICAgIGV2ZW50LmNvZGUgPT09ICdTcGFjZScgfHxcbiAgICAgICAgICAgIGV2ZW50LmNvZGUgPT09ICdBcnJvd1VwJyB8fFxuICAgICAgICAgICAgZXZlbnQuY29kZSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBmb2N1c0lucHV0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHZhciBhY3RpdmVJbnB1dCA9IE1hdGgubWF4KE1hdGgubWluKG51bUlucHV0cyAtIDEsIGluZGV4KSwgMCk7XG4gICAgICAgIGlmIChpbnB1dFJlZnMuY3VycmVudFthY3RpdmVJbnB1dF0pIHtcbiAgICAgICAgICAgIChfYSA9IGlucHV0UmVmcy5jdXJyZW50W2FjdGl2ZUlucHV0XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvY3VzKCk7XG4gICAgICAgICAgICAoX2IgPSBpbnB1dFJlZnMuY3VycmVudFthY3RpdmVJbnB1dF0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zZWxlY3QoKTtcbiAgICAgICAgICAgIHNldEFjdGl2ZUlucHV0KGFjdGl2ZUlucHV0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNoYW5nZUNvZGVBdEZvY3VzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBvdHAgPSBnZXRPVFBWYWx1ZSgpO1xuICAgICAgICBvdHBbYWN0aXZlSW5wdXRdID0gdmFsdWVbMF07XG4gICAgICAgIGhhbmRsZU9UUENoYW5nZShvdHApO1xuICAgIH07XG4gICAgdmFyIGhhbmRsZU9UUENoYW5nZSA9IGZ1bmN0aW9uIChvdHApIHtcbiAgICAgICAgdmFyIG90cFZhbHVlID0gb3RwLmpvaW4oJycpO1xuICAgICAgICBvbkNoYW5nZShvdHBWYWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlUGFzdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgb3RwID0gZ2V0T1RQVmFsdWUoKTtcbiAgICAgICAgdmFyIG5leHRBY3RpdmVJbnB1dCA9IGFjdGl2ZUlucHV0O1xuICAgICAgICAvLyBHZXQgcGFzdGVkRGF0YSBpbiBhbiBhcnJheSBvZiBtYXggc2l6ZSAobnVtIG9mIGlucHV0cyAtIGN1cnJlbnQgcG9zaXRpb24pXG4gICAgICAgIHZhciBwYXN0ZWREYXRhID0gZXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgLmdldERhdGEoJ3RleHQvcGxhaW4nKVxuICAgICAgICAgICAgLnNsaWNlKDAsIG51bUlucHV0cyAtIGFjdGl2ZUlucHV0KVxuICAgICAgICAgICAgLnNwbGl0KCcnKTtcbiAgICAgICAgLy8gUHJldmVudCBwYXN0aW5nIGlmIHRoZSBjbGlwYm9hcmQgZGF0YSBjb250YWlucyBub24tbnVtZXJpYyB2YWx1ZXMgZm9yIG51bWJlciBpbnB1dHNcbiAgICAgICAgaWYgKGlzSW5wdXROdW0gJiYgcGFzdGVkRGF0YS5zb21lKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXNOYU4oTnVtYmVyKHZhbHVlKSk7IH0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGFzdGUgZGF0YSBmcm9tIGZvY3VzZWQgaW5wdXQgb253YXJkc1xuICAgICAgICBmb3IgKHZhciBwb3MgPSAwOyBwb3MgPCBudW1JbnB1dHM7ICsrcG9zKSB7XG4gICAgICAgICAgICBpZiAocG9zID49IGFjdGl2ZUlucHV0ICYmIHBhc3RlZERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG90cFtwb3NdID0gKF9hID0gcGFzdGVkRGF0YS5zaGlmdCgpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbiAgICAgICAgICAgICAgICBuZXh0QWN0aXZlSW5wdXQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb2N1c0lucHV0KG5leHRBY3RpdmVJbnB1dCk7XG4gICAgICAgIGhhbmRsZU9UUENoYW5nZShvdHApO1xuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IE9iamVjdC5hc3NpZ24oeyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH0sIGlzU3R5bGVPYmplY3QoY29udGFpbmVyU3R5bGUpICYmIGNvbnRhaW5lclN0eWxlKSwgY2xhc3NOYW1lOiB0eXBlb2YgY29udGFpbmVyU3R5bGUgPT09ICdzdHJpbmcnID8gY29udGFpbmVyU3R5bGUgOiB1bmRlZmluZWQsIG9uUGFzdGU6IG9uUGFzdGUgfSwgQXJyYXkuZnJvbSh7IGxlbmd0aDogbnVtSW5wdXRzIH0sIGZ1bmN0aW9uIChfLCBpbmRleCkgeyByZXR1cm4gaW5kZXg7IH0pLm1hcChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgeyBrZXk6IGluZGV4IH0sXG4gICAgICAgICAgICByZW5kZXJJbnB1dCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IChfYSA9IGdldE9UUFZhbHVlKClbaW5kZXhdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogKF9jID0gKF9iID0gZ2V0UGxhY2Vob2xkZXJWYWx1ZSgpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbaW5kZXhdKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcmVmOiBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gKGlucHV0UmVmcy5jdXJyZW50W2luZGV4XSA9IGVsZW1lbnQpOyB9LFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsXG4gICAgICAgICAgICAgICAgb25Gb2N1czogZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBoYW5kbGVGb2N1cyhldmVudCkoaW5kZXgpOyB9LFxuICAgICAgICAgICAgICAgIG9uQmx1cjogaGFuZGxlQmx1cixcbiAgICAgICAgICAgICAgICBvbktleURvd246IGhhbmRsZUtleURvd24sXG4gICAgICAgICAgICAgICAgb25QYXN0ZTogaGFuZGxlUGFzdGUsXG4gICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlOiAnb2ZmJyxcbiAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IFwiUGxlYXNlIGVudGVyIE9UUCBjaGFyYWN0ZXIgXCIuY29uY2F0KGluZGV4ICsgMSksXG4gICAgICAgICAgICAgICAgc3R5bGU6IE9iamVjdC5hc3NpZ24oIXNraXBEZWZhdWx0U3R5bGVzID8geyB3aWR0aDogJzFlbScsIHRleHRBbGlnbjogJ2NlbnRlcicgfSA6IHt9LCBpc1N0eWxlT2JqZWN0KGlucHV0U3R5bGUpID8gaW5wdXRTdHlsZSA6IHt9KSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHR5cGVvZiBpbnB1dFN0eWxlID09PSAnc3RyaW5nJyA/IGlucHV0U3R5bGUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdHlwZTogaW5wdXRUeXBlLFxuICAgICAgICAgICAgICAgIGlucHV0TW9kZTogaXNJbnB1dE51bSA/ICdudW1lcmljJyA6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICBvbklucHV0OiBoYW5kbGVJbnB1dENoYW5nZSxcbiAgICAgICAgICAgIH0sIGluZGV4KSxcbiAgICAgICAgICAgIGluZGV4IDwgbnVtSW5wdXRzIC0gMSAmJiAodHlwZW9mIHJlbmRlclNlcGFyYXRvciA9PT0gJ2Z1bmN0aW9uJyA/IHJlbmRlclNlcGFyYXRvcihpbmRleCkgOiByZW5kZXJTZXBhcmF0b3IpKSk7XG4gICAgfSkpKTtcbn07XG5cbmV4cG9ydCB7IE9UUElucHV0IGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbS5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-otp-input/lib/index.esm.js\n");

/***/ })

};
;