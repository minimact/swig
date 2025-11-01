var Minimact = (function (exports) {
    'use strict';

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** Error thrown when an HTTP request fails. */
    class HttpError extends Error {
        /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
         *
         * @param {string} errorMessage A descriptive error message.
         * @param {number} statusCode The HTTP status code represented by this error.
         */
        constructor(errorMessage, statusCode) {
            const trueProto = new.target.prototype;
            super(`${errorMessage}: Status code '${statusCode}'`);
            this.statusCode = statusCode;
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            this.__proto__ = trueProto;
        }
    }
    /** Error thrown when a timeout elapses. */
    class TimeoutError extends Error {
        /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
         *
         * @param {string} errorMessage A descriptive error message.
         */
        constructor(errorMessage = "A timeout occurred.") {
            const trueProto = new.target.prototype;
            super(errorMessage);
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            this.__proto__ = trueProto;
        }
    }
    /** Error thrown when an action is aborted. */
    class AbortError extends Error {
        /** Constructs a new instance of {@link AbortError}.
         *
         * @param {string} errorMessage A descriptive error message.
         */
        constructor(errorMessage = "An abort occurred.") {
            const trueProto = new.target.prototype;
            super(errorMessage);
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            this.__proto__ = trueProto;
        }
    }
    /** Error thrown when the selected transport is unsupported by the browser. */
    /** @private */
    class UnsupportedTransportError extends Error {
        /** Constructs a new instance of {@link @microsoft/signalr.UnsupportedTransportError}.
         *
         * @param {string} message A descriptive error message.
         * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
         */
        constructor(message, transport) {
            const trueProto = new.target.prototype;
            super(message);
            this.transport = transport;
            this.errorType = 'UnsupportedTransportError';
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            this.__proto__ = trueProto;
        }
    }
    /** Error thrown when the selected transport is disabled by the browser. */
    /** @private */
    class DisabledTransportError extends Error {
        /** Constructs a new instance of {@link @microsoft/signalr.DisabledTransportError}.
         *
         * @param {string} message A descriptive error message.
         * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
         */
        constructor(message, transport) {
            const trueProto = new.target.prototype;
            super(message);
            this.transport = transport;
            this.errorType = 'DisabledTransportError';
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            this.__proto__ = trueProto;
        }
    }
    /** Error thrown when the selected transport cannot be started. */
    /** @private */
    class FailedToStartTransportError extends Error {
        /** Constructs a new instance of {@link @microsoft/signalr.FailedToStartTransportError}.
         *
         * @param {string} message A descriptive error message.
         * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
         */
        constructor(message, transport) {
            const trueProto = new.target.prototype;
            super(message);
            this.transport = transport;
            this.errorType = 'FailedToStartTransportError';
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            this.__proto__ = trueProto;
        }
    }
    /** Error thrown when the negotiation with the server failed to complete. */
    /** @private */
    class FailedToNegotiateWithServerError extends Error {
        /** Constructs a new instance of {@link @microsoft/signalr.FailedToNegotiateWithServerError}.
         *
         * @param {string} message A descriptive error message.
         */
        constructor(message) {
            const trueProto = new.target.prototype;
            super(message);
            this.errorType = 'FailedToNegotiateWithServerError';
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            this.__proto__ = trueProto;
        }
    }
    /** Error thrown when multiple errors have occurred. */
    /** @private */
    class AggregateErrors extends Error {
        /** Constructs a new instance of {@link @microsoft/signalr.AggregateErrors}.
         *
         * @param {string} message A descriptive error message.
         * @param {Error[]} innerErrors The collection of errors this error is aggregating.
         */
        constructor(message, innerErrors) {
            const trueProto = new.target.prototype;
            super(message);
            this.innerErrors = innerErrors;
            // Workaround issue in Typescript compiler
            // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
            this.__proto__ = trueProto;
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** Represents an HTTP response. */
    class HttpResponse {
        constructor(statusCode, statusText, content) {
            this.statusCode = statusCode;
            this.statusText = statusText;
            this.content = content;
        }
    }
    /** Abstraction over an HTTP client.
     *
     * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
     */
    class HttpClient {
        get(url, options) {
            return this.send({
                ...options,
                method: "GET",
                url,
            });
        }
        post(url, options) {
            return this.send({
                ...options,
                method: "POST",
                url,
            });
        }
        delete(url, options) {
            return this.send({
                ...options,
                method: "DELETE",
                url,
            });
        }
        /** Gets all cookies that apply to the specified URL.
         *
         * @param url The URL that the cookies are valid for.
         * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
         */
        // @ts-ignore
        getCookieString(url) {
            return "";
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    // These values are designed to match the ASP.NET Log Levels since that's the pattern we're emulating here.
    /** Indicates the severity of a log message.
     *
     * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
     */
    var LogLevel;
    (function (LogLevel) {
        /** Log level for very low severity diagnostic messages. */
        LogLevel[LogLevel["Trace"] = 0] = "Trace";
        /** Log level for low severity diagnostic messages. */
        LogLevel[LogLevel["Debug"] = 1] = "Debug";
        /** Log level for informational diagnostic messages. */
        LogLevel[LogLevel["Information"] = 2] = "Information";
        /** Log level for diagnostic messages that indicate a non-fatal problem. */
        LogLevel[LogLevel["Warning"] = 3] = "Warning";
        /** Log level for diagnostic messages that indicate a failure in the current operation. */
        LogLevel[LogLevel["Error"] = 4] = "Error";
        /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
        LogLevel[LogLevel["Critical"] = 5] = "Critical";
        /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
        LogLevel[LogLevel["None"] = 6] = "None";
    })(LogLevel || (LogLevel = {}));

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** A logger that does nothing when log messages are sent to it. */
    class NullLogger {
        constructor() { }
        /** @inheritDoc */
        // eslint-disable-next-line
        log(_logLevel, _message) {
        }
    }
    /** The singleton instance of the {@link @microsoft/signalr.NullLogger}. */
    NullLogger.instance = new NullLogger();

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    // Version token that will be replaced by the prepack command
    /** The version of the SignalR client. */
    const VERSION = "8.0.17";
    /** @private */
    class Arg {
        static isRequired(val, name) {
            if (val === null || val === undefined) {
                throw new Error(`The '${name}' argument is required.`);
            }
        }
        static isNotEmpty(val, name) {
            if (!val || val.match(/^\s*$/)) {
                throw new Error(`The '${name}' argument should not be empty.`);
            }
        }
        static isIn(val, values, name) {
            // TypeScript enums have keys for **both** the name and the value of each enum member on the type itself.
            if (!(val in values)) {
                throw new Error(`Unknown ${name} value: ${val}.`);
            }
        }
    }
    /** @private */
    class Platform {
        // react-native has a window but no document so we should check both
        static get isBrowser() {
            return !Platform.isNode && typeof window === "object" && typeof window.document === "object";
        }
        // WebWorkers don't have a window object so the isBrowser check would fail
        static get isWebWorker() {
            return !Platform.isNode && typeof self === "object" && "importScripts" in self;
        }
        // react-native has a window but no document
        static get isReactNative() {
            return !Platform.isNode && typeof window === "object" && typeof window.document === "undefined";
        }
        // Node apps shouldn't have a window object, but WebWorkers don't either
        // so we need to check for both WebWorker and window
        static get isNode() {
            return typeof process !== "undefined" && process.release && process.release.name === "node";
        }
    }
    /** @private */
    function getDataDetail(data, includeContent) {
        let detail = "";
        if (isArrayBuffer(data)) {
            detail = `Binary data of length ${data.byteLength}`;
            if (includeContent) {
                detail += `. Content: '${formatArrayBuffer(data)}'`;
            }
        }
        else if (typeof data === "string") {
            detail = `String data of length ${data.length}`;
            if (includeContent) {
                detail += `. Content: '${data}'`;
            }
        }
        return detail;
    }
    /** @private */
    function formatArrayBuffer(data) {
        const view = new Uint8Array(data);
        // Uint8Array.map only supports returning another Uint8Array?
        let str = "";
        view.forEach((num) => {
            const pad = num < 16 ? "0" : "";
            str += `0x${pad}${num.toString(16)} `;
        });
        // Trim of trailing space.
        return str.substr(0, str.length - 1);
    }
    // Also in signalr-protocol-msgpack/Utils.ts
    /** @private */
    function isArrayBuffer(val) {
        return val && typeof ArrayBuffer !== "undefined" &&
            (val instanceof ArrayBuffer ||
                // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
                (val.constructor && val.constructor.name === "ArrayBuffer"));
    }
    /** @private */
    async function sendMessage(logger, transportName, httpClient, url, content, options) {
        const headers = {};
        const [name, value] = getUserAgentHeader();
        headers[name] = value;
        logger.log(LogLevel.Trace, `(${transportName} transport) sending data. ${getDataDetail(content, options.logMessageContent)}.`);
        const responseType = isArrayBuffer(content) ? "arraybuffer" : "text";
        const response = await httpClient.post(url, {
            content,
            headers: { ...headers, ...options.headers },
            responseType,
            timeout: options.timeout,
            withCredentials: options.withCredentials,
        });
        logger.log(LogLevel.Trace, `(${transportName} transport) request complete. Response status: ${response.statusCode}.`);
    }
    /** @private */
    function createLogger(logger) {
        if (logger === undefined) {
            return new ConsoleLogger(LogLevel.Information);
        }
        if (logger === null) {
            return NullLogger.instance;
        }
        if (logger.log !== undefined) {
            return logger;
        }
        return new ConsoleLogger(logger);
    }
    /** @private */
    class SubjectSubscription {
        constructor(subject, observer) {
            this._subject = subject;
            this._observer = observer;
        }
        dispose() {
            const index = this._subject.observers.indexOf(this._observer);
            if (index > -1) {
                this._subject.observers.splice(index, 1);
            }
            if (this._subject.observers.length === 0 && this._subject.cancelCallback) {
                this._subject.cancelCallback().catch((_) => { });
            }
        }
    }
    /** @private */
    class ConsoleLogger {
        constructor(minimumLogLevel) {
            this._minLevel = minimumLogLevel;
            this.out = console;
        }
        log(logLevel, message) {
            if (logLevel >= this._minLevel) {
                const msg = `[${new Date().toISOString()}] ${LogLevel[logLevel]}: ${message}`;
                switch (logLevel) {
                    case LogLevel.Critical:
                    case LogLevel.Error:
                        this.out.error(msg);
                        break;
                    case LogLevel.Warning:
                        this.out.warn(msg);
                        break;
                    case LogLevel.Information:
                        this.out.info(msg);
                        break;
                    default:
                        // console.debug only goes to attached debuggers in Node, so we use console.log for Trace and Debug
                        this.out.log(msg);
                        break;
                }
            }
        }
    }
    /** @private */
    function getUserAgentHeader() {
        let userAgentHeaderName = "X-SignalR-User-Agent";
        if (Platform.isNode) {
            userAgentHeaderName = "User-Agent";
        }
        return [userAgentHeaderName, constructUserAgent(VERSION, getOsName(), getRuntime(), getRuntimeVersion())];
    }
    /** @private */
    function constructUserAgent(version, os, runtime, runtimeVersion) {
        // Microsoft SignalR/[Version] ([Detailed Version]; [Operating System]; [Runtime]; [Runtime Version])
        let userAgent = "Microsoft SignalR/";
        const majorAndMinor = version.split(".");
        userAgent += `${majorAndMinor[0]}.${majorAndMinor[1]}`;
        userAgent += ` (${version}; `;
        if (os && os !== "") {
            userAgent += `${os}; `;
        }
        else {
            userAgent += "Unknown OS; ";
        }
        userAgent += `${runtime}`;
        if (runtimeVersion) {
            userAgent += `; ${runtimeVersion}`;
        }
        else {
            userAgent += "; Unknown Runtime Version";
        }
        userAgent += ")";
        return userAgent;
    }
    // eslint-disable-next-line spaced-comment
     function getOsName() {
        if (Platform.isNode) {
            switch (process.platform) {
                case "win32":
                    return "Windows NT";
                case "darwin":
                    return "macOS";
                case "linux":
                    return "Linux";
                default:
                    return process.platform;
            }
        }
        else {
            return "";
        }
    }
    // eslint-disable-next-line spaced-comment
     function getRuntimeVersion() {
        if (Platform.isNode) {
            return process.versions.node;
        }
        return undefined;
    }
    function getRuntime() {
        if (Platform.isNode) {
            return "NodeJS";
        }
        else {
            return "Browser";
        }
    }
    /** @private */
    function getErrorString(e) {
        if (e.stack) {
            return e.stack;
        }
        else if (e.message) {
            return e.message;
        }
        return `${e}`;
    }
    /** @private */
    function getGlobalThis() {
        // globalThis is semi-new and not available in Node until v12
        if (typeof globalThis !== "undefined") {
            return globalThis;
        }
        if (typeof self !== "undefined") {
            return self;
        }
        if (typeof window !== "undefined") {
            return window;
        }
        if (typeof global !== "undefined") {
            return global;
        }
        throw new Error("could not find global");
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    class FetchHttpClient extends HttpClient {
        constructor(logger) {
            super();
            this._logger = logger;
            // Node added a fetch implementation to the global scope starting in v18.
            // We need to add a cookie jar in node to be able to share cookies with WebSocket
            if (typeof fetch === "undefined" || Platform.isNode) {
                // In order to ignore the dynamic require in webpack builds we need to do this magic
                // @ts-ignore: TS doesn't know about these names
                const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
                // Cookies aren't automatically handled in Node so we need to add a CookieJar to preserve cookies across requests
                this._jar = new (requireFunc("tough-cookie")).CookieJar();
                if (typeof fetch === "undefined") {
                    this._fetchType = requireFunc("node-fetch");
                }
                else {
                    // Use fetch from Node if available
                    this._fetchType = fetch;
                }
                // node-fetch doesn't have a nice API for getting and setting cookies
                // fetch-cookie will wrap a fetch implementation with a default CookieJar or a provided one
                this._fetchType = requireFunc("fetch-cookie")(this._fetchType, this._jar);
            }
            else {
                this._fetchType = fetch.bind(getGlobalThis());
            }
            if (typeof AbortController === "undefined") {
                // In order to ignore the dynamic require in webpack builds we need to do this magic
                // @ts-ignore: TS doesn't know about these names
                const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
                // Node needs EventListener methods on AbortController which our custom polyfill doesn't provide
                this._abortControllerType = requireFunc("abort-controller");
            }
            else {
                this._abortControllerType = AbortController;
            }
        }
        /** @inheritDoc */
        async send(request) {
            // Check that abort was not signaled before calling send
            if (request.abortSignal && request.abortSignal.aborted) {
                throw new AbortError();
            }
            if (!request.method) {
                throw new Error("No method defined.");
            }
            if (!request.url) {
                throw new Error("No url defined.");
            }
            const abortController = new this._abortControllerType();
            let error;
            // Hook our abortSignal into the abort controller
            if (request.abortSignal) {
                request.abortSignal.onabort = () => {
                    abortController.abort();
                    error = new AbortError();
                };
            }
            // If a timeout has been passed in, setup a timeout to call abort
            // Type needs to be any to fit window.setTimeout and NodeJS.setTimeout
            let timeoutId = null;
            if (request.timeout) {
                const msTimeout = request.timeout;
                timeoutId = setTimeout(() => {
                    abortController.abort();
                    this._logger.log(LogLevel.Warning, `Timeout from HTTP request.`);
                    error = new TimeoutError();
                }, msTimeout);
            }
            if (request.content === "") {
                request.content = undefined;
            }
            if (request.content) {
                // Explicitly setting the Content-Type header for React Native on Android platform.
                request.headers = request.headers || {};
                if (isArrayBuffer(request.content)) {
                    request.headers["Content-Type"] = "application/octet-stream";
                }
                else {
                    request.headers["Content-Type"] = "text/plain;charset=UTF-8";
                }
            }
            let response;
            try {
                response = await this._fetchType(request.url, {
                    body: request.content,
                    cache: "no-cache",
                    credentials: request.withCredentials === true ? "include" : "same-origin",
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        ...request.headers,
                    },
                    method: request.method,
                    mode: "cors",
                    redirect: "follow",
                    signal: abortController.signal,
                });
            }
            catch (e) {
                if (error) {
                    throw error;
                }
                this._logger.log(LogLevel.Warning, `Error from HTTP request. ${e}.`);
                throw e;
            }
            finally {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                if (request.abortSignal) {
                    request.abortSignal.onabort = null;
                }
            }
            if (!response.ok) {
                const errorMessage = await deserializeContent(response, "text");
                throw new HttpError(errorMessage || response.statusText, response.status);
            }
            const content = deserializeContent(response, request.responseType);
            const payload = await content;
            return new HttpResponse(response.status, response.statusText, payload);
        }
        getCookieString(url) {
            let cookies = "";
            if (Platform.isNode && this._jar) {
                // @ts-ignore: unused variable
                this._jar.getCookies(url, (e, c) => cookies = c.join("; "));
            }
            return cookies;
        }
    }
    function deserializeContent(response, responseType) {
        let content;
        switch (responseType) {
            case "arraybuffer":
                content = response.arrayBuffer();
                break;
            case "text":
                content = response.text();
                break;
            case "blob":
            case "document":
            case "json":
                throw new Error(`${responseType} is not supported.`);
            default:
                content = response.text();
                break;
        }
        return content;
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    class XhrHttpClient extends HttpClient {
        constructor(logger) {
            super();
            this._logger = logger;
        }
        /** @inheritDoc */
        send(request) {
            // Check that abort was not signaled before calling send
            if (request.abortSignal && request.abortSignal.aborted) {
                return Promise.reject(new AbortError());
            }
            if (!request.method) {
                return Promise.reject(new Error("No method defined."));
            }
            if (!request.url) {
                return Promise.reject(new Error("No url defined."));
            }
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(request.method, request.url, true);
                xhr.withCredentials = request.withCredentials === undefined ? true : request.withCredentials;
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                if (request.content === "") {
                    request.content = undefined;
                }
                if (request.content) {
                    // Explicitly setting the Content-Type header for React Native on Android platform.
                    if (isArrayBuffer(request.content)) {
                        xhr.setRequestHeader("Content-Type", "application/octet-stream");
                    }
                    else {
                        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
                    }
                }
                const headers = request.headers;
                if (headers) {
                    Object.keys(headers)
                        .forEach((header) => {
                        xhr.setRequestHeader(header, headers[header]);
                    });
                }
                if (request.responseType) {
                    xhr.responseType = request.responseType;
                }
                if (request.abortSignal) {
                    request.abortSignal.onabort = () => {
                        xhr.abort();
                        reject(new AbortError());
                    };
                }
                if (request.timeout) {
                    xhr.timeout = request.timeout;
                }
                xhr.onload = () => {
                    if (request.abortSignal) {
                        request.abortSignal.onabort = null;
                    }
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(new HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
                    }
                    else {
                        reject(new HttpError(xhr.response || xhr.responseText || xhr.statusText, xhr.status));
                    }
                };
                xhr.onerror = () => {
                    this._logger.log(LogLevel.Warning, `Error from HTTP request. ${xhr.status}: ${xhr.statusText}.`);
                    reject(new HttpError(xhr.statusText, xhr.status));
                };
                xhr.ontimeout = () => {
                    this._logger.log(LogLevel.Warning, `Timeout from HTTP request.`);
                    reject(new TimeoutError());
                };
                xhr.send(request.content);
            });
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** Default implementation of {@link @microsoft/signalr.HttpClient}. */
    class DefaultHttpClient extends HttpClient {
        /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
        constructor(logger) {
            super();
            if (typeof fetch !== "undefined" || Platform.isNode) {
                this._httpClient = new FetchHttpClient(logger);
            }
            else if (typeof XMLHttpRequest !== "undefined") {
                this._httpClient = new XhrHttpClient(logger);
            }
            else {
                throw new Error("No usable HttpClient found.");
            }
        }
        /** @inheritDoc */
        send(request) {
            // Check that abort was not signaled before calling send
            if (request.abortSignal && request.abortSignal.aborted) {
                return Promise.reject(new AbortError());
            }
            if (!request.method) {
                return Promise.reject(new Error("No method defined."));
            }
            if (!request.url) {
                return Promise.reject(new Error("No url defined."));
            }
            return this._httpClient.send(request);
        }
        getCookieString(url) {
            return this._httpClient.getCookieString(url);
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    // Not exported from index
    /** @private */
    class TextMessageFormat {
        static write(output) {
            return `${output}${TextMessageFormat.RecordSeparator}`;
        }
        static parse(input) {
            if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
                throw new Error("Message is incomplete.");
            }
            const messages = input.split(TextMessageFormat.RecordSeparator);
            messages.pop();
            return messages;
        }
    }
    TextMessageFormat.RecordSeparatorCode = 0x1e;
    TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** @private */
    class HandshakeProtocol {
        // Handshake request is always JSON
        writeHandshakeRequest(handshakeRequest) {
            return TextMessageFormat.write(JSON.stringify(handshakeRequest));
        }
        parseHandshakeResponse(data) {
            let messageData;
            let remainingData;
            if (isArrayBuffer(data)) {
                // Format is binary but still need to read JSON text from handshake response
                const binaryData = new Uint8Array(data);
                const separatorIndex = binaryData.indexOf(TextMessageFormat.RecordSeparatorCode);
                if (separatorIndex === -1) {
                    throw new Error("Message is incomplete.");
                }
                // content before separator is handshake response
                // optional content after is additional messages
                const responseLength = separatorIndex + 1;
                messageData = String.fromCharCode.apply(null, Array.prototype.slice.call(binaryData.slice(0, responseLength)));
                remainingData = (binaryData.byteLength > responseLength) ? binaryData.slice(responseLength).buffer : null;
            }
            else {
                const textData = data;
                const separatorIndex = textData.indexOf(TextMessageFormat.RecordSeparator);
                if (separatorIndex === -1) {
                    throw new Error("Message is incomplete.");
                }
                // content before separator is handshake response
                // optional content after is additional messages
                const responseLength = separatorIndex + 1;
                messageData = textData.substring(0, responseLength);
                remainingData = (textData.length > responseLength) ? textData.substring(responseLength) : null;
            }
            // At this point we should have just the single handshake message
            const messages = TextMessageFormat.parse(messageData);
            const response = JSON.parse(messages[0]);
            if (response.type) {
                throw new Error("Expected a handshake response from the server.");
            }
            const responseMessage = response;
            // multiple messages could have arrived with handshake
            // return additional data to be parsed as usual, or null if all parsed
            return [remainingData, responseMessage];
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** Defines the type of a Hub Message. */
    var MessageType;
    (function (MessageType) {
        /** Indicates the message is an Invocation message and implements the {@link @microsoft/signalr.InvocationMessage} interface. */
        MessageType[MessageType["Invocation"] = 1] = "Invocation";
        /** Indicates the message is a StreamItem message and implements the {@link @microsoft/signalr.StreamItemMessage} interface. */
        MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
        /** Indicates the message is a Completion message and implements the {@link @microsoft/signalr.CompletionMessage} interface. */
        MessageType[MessageType["Completion"] = 3] = "Completion";
        /** Indicates the message is a Stream Invocation message and implements the {@link @microsoft/signalr.StreamInvocationMessage} interface. */
        MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
        /** Indicates the message is a Cancel Invocation message and implements the {@link @microsoft/signalr.CancelInvocationMessage} interface. */
        MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
        /** Indicates the message is a Ping message and implements the {@link @microsoft/signalr.PingMessage} interface. */
        MessageType[MessageType["Ping"] = 6] = "Ping";
        /** Indicates the message is a Close message and implements the {@link @microsoft/signalr.CloseMessage} interface. */
        MessageType[MessageType["Close"] = 7] = "Close";
        MessageType[MessageType["Ack"] = 8] = "Ack";
        MessageType[MessageType["Sequence"] = 9] = "Sequence";
    })(MessageType || (MessageType = {}));

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** Stream implementation to stream items to the server. */
    class Subject {
        constructor() {
            this.observers = [];
        }
        next(item) {
            for (const observer of this.observers) {
                observer.next(item);
            }
        }
        error(err) {
            for (const observer of this.observers) {
                if (observer.error) {
                    observer.error(err);
                }
            }
        }
        complete() {
            for (const observer of this.observers) {
                if (observer.complete) {
                    observer.complete();
                }
            }
        }
        subscribe(observer) {
            this.observers.push(observer);
            return new SubjectSubscription(this, observer);
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** @private */
    class MessageBuffer {
        constructor(protocol, connection, bufferSize) {
            this._bufferSize = 100000;
            this._messages = [];
            this._totalMessageCount = 0;
            this._waitForSequenceMessage = false;
            // Message IDs start at 1 and always increment by 1
            this._nextReceivingSequenceId = 1;
            this._latestReceivedSequenceId = 0;
            this._bufferedByteCount = 0;
            this._reconnectInProgress = false;
            this._protocol = protocol;
            this._connection = connection;
            this._bufferSize = bufferSize;
        }
        async _send(message) {
            const serializedMessage = this._protocol.writeMessage(message);
            let backpressurePromise = Promise.resolve();
            // Only count invocation messages. Acks, pings, etc. don't need to be resent on reconnect
            if (this._isInvocationMessage(message)) {
                this._totalMessageCount++;
                let backpressurePromiseResolver = () => { };
                let backpressurePromiseRejector = () => { };
                if (isArrayBuffer(serializedMessage)) {
                    this._bufferedByteCount += serializedMessage.byteLength;
                }
                else {
                    this._bufferedByteCount += serializedMessage.length;
                }
                if (this._bufferedByteCount >= this._bufferSize) {
                    backpressurePromise = new Promise((resolve, reject) => {
                        backpressurePromiseResolver = resolve;
                        backpressurePromiseRejector = reject;
                    });
                }
                this._messages.push(new BufferedItem(serializedMessage, this._totalMessageCount, backpressurePromiseResolver, backpressurePromiseRejector));
            }
            try {
                // If this is set it means we are reconnecting or resending
                // We don't want to send on a disconnected connection
                // And we don't want to send if resend is running since that would mean sending
                // this message twice
                if (!this._reconnectInProgress) {
                    await this._connection.send(serializedMessage);
                }
            }
            catch {
                this._disconnected();
            }
            await backpressurePromise;
        }
        _ack(ackMessage) {
            let newestAckedMessage = -1;
            // Find index of newest message being acked
            for (let index = 0; index < this._messages.length; index++) {
                const element = this._messages[index];
                if (element._id <= ackMessage.sequenceId) {
                    newestAckedMessage = index;
                    if (isArrayBuffer(element._message)) {
                        this._bufferedByteCount -= element._message.byteLength;
                    }
                    else {
                        this._bufferedByteCount -= element._message.length;
                    }
                    // resolve items that have already been sent and acked
                    element._resolver();
                }
                else if (this._bufferedByteCount < this._bufferSize) {
                    // resolve items that now fall under the buffer limit but haven't been acked
                    element._resolver();
                }
                else {
                    break;
                }
            }
            if (newestAckedMessage !== -1) {
                // We're removing everything including the message pointed to, so add 1
                this._messages = this._messages.slice(newestAckedMessage + 1);
            }
        }
        _shouldProcessMessage(message) {
            if (this._waitForSequenceMessage) {
                if (message.type !== MessageType.Sequence) {
                    return false;
                }
                else {
                    this._waitForSequenceMessage = false;
                    return true;
                }
            }
            // No special processing for acks, pings, etc.
            if (!this._isInvocationMessage(message)) {
                return true;
            }
            const currentId = this._nextReceivingSequenceId;
            this._nextReceivingSequenceId++;
            if (currentId <= this._latestReceivedSequenceId) {
                if (currentId === this._latestReceivedSequenceId) {
                    // Should only hit this if we just reconnected and the server is sending
                    // Messages it has buffered, which would mean it hasn't seen an Ack for these messages
                    this._ackTimer();
                }
                // Ignore, this is a duplicate message
                return false;
            }
            this._latestReceivedSequenceId = currentId;
            // Only start the timer for sending an Ack message when we have a message to ack. This also conveniently solves
            // timer throttling by not having a recursive timer, and by starting the timer via a network call (recv)
            this._ackTimer();
            return true;
        }
        _resetSequence(message) {
            if (message.sequenceId > this._nextReceivingSequenceId) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));
                return;
            }
            this._nextReceivingSequenceId = message.sequenceId;
        }
        _disconnected() {
            this._reconnectInProgress = true;
            this._waitForSequenceMessage = true;
        }
        async _resend() {
            const sequenceId = this._messages.length !== 0
                ? this._messages[0]._id
                : this._totalMessageCount + 1;
            await this._connection.send(this._protocol.writeMessage({ type: MessageType.Sequence, sequenceId }));
            // Get a local variable to the _messages, just in case messages are acked while resending
            // Which would slice the _messages array (which creates a new copy)
            const messages = this._messages;
            for (const element of messages) {
                await this._connection.send(element._message);
            }
            this._reconnectInProgress = false;
        }
        _dispose(error) {
            error !== null && error !== void 0 ? error : (error = new Error("Unable to reconnect to server."));
            // Unblock backpressure if any
            for (const element of this._messages) {
                element._rejector(error);
            }
        }
        _isInvocationMessage(message) {
            // There is no way to check if something implements an interface.
            // So we individually check the messages in a switch statement.
            // To make sure we don't miss any message types we rely on the compiler
            // seeing the function returns a value and it will do the
            // exhaustive check for us on the switch statement, since we don't use 'case default'
            switch (message.type) {
                case MessageType.Invocation:
                case MessageType.StreamItem:
                case MessageType.Completion:
                case MessageType.StreamInvocation:
                case MessageType.CancelInvocation:
                    return true;
                case MessageType.Close:
                case MessageType.Sequence:
                case MessageType.Ping:
                case MessageType.Ack:
                    return false;
            }
        }
        _ackTimer() {
            if (this._ackTimerHandle === undefined) {
                this._ackTimerHandle = setTimeout(async () => {
                    try {
                        if (!this._reconnectInProgress) {
                            await this._connection.send(this._protocol.writeMessage({ type: MessageType.Ack, sequenceId: this._latestReceivedSequenceId }));
                        }
                        // Ignore errors, that means the connection is closed and we don't care about the Ack message anymore.
                    }
                    catch { }
                    clearTimeout(this._ackTimerHandle);
                    this._ackTimerHandle = undefined;
                    // 1 second delay so we don't spam Ack messages if there are many messages being received at once.
                }, 1000);
            }
        }
    }
    class BufferedItem {
        constructor(message, id, resolver, rejector) {
            this._message = message;
            this._id = id;
            this._resolver = resolver;
            this._rejector = rejector;
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    const DEFAULT_TIMEOUT_IN_MS = 30 * 1000;
    const DEFAULT_PING_INTERVAL_IN_MS = 15 * 1000;
    const DEFAULT_STATEFUL_RECONNECT_BUFFER_SIZE = 100000;
    /** Describes the current state of the {@link HubConnection} to the server. */
    var HubConnectionState;
    (function (HubConnectionState) {
        /** The hub connection is disconnected. */
        HubConnectionState["Disconnected"] = "Disconnected";
        /** The hub connection is connecting. */
        HubConnectionState["Connecting"] = "Connecting";
        /** The hub connection is connected. */
        HubConnectionState["Connected"] = "Connected";
        /** The hub connection is disconnecting. */
        HubConnectionState["Disconnecting"] = "Disconnecting";
        /** The hub connection is reconnecting. */
        HubConnectionState["Reconnecting"] = "Reconnecting";
    })(HubConnectionState || (HubConnectionState = {}));
    /** Represents a connection to a SignalR Hub. */
    class HubConnection {
        /** @internal */
        // Using a public static factory method means we can have a private constructor and an _internal_
        // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
        // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
        // public parameter-less constructor.
        static create(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds, statefulReconnectBufferSize) {
            return new HubConnection(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds, statefulReconnectBufferSize);
        }
        constructor(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds, statefulReconnectBufferSize) {
            this._nextKeepAlive = 0;
            this._freezeEventListener = () => {
                this._logger.log(LogLevel.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
            };
            Arg.isRequired(connection, "connection");
            Arg.isRequired(logger, "logger");
            Arg.isRequired(protocol, "protocol");
            this.serverTimeoutInMilliseconds = serverTimeoutInMilliseconds !== null && serverTimeoutInMilliseconds !== void 0 ? serverTimeoutInMilliseconds : DEFAULT_TIMEOUT_IN_MS;
            this.keepAliveIntervalInMilliseconds = keepAliveIntervalInMilliseconds !== null && keepAliveIntervalInMilliseconds !== void 0 ? keepAliveIntervalInMilliseconds : DEFAULT_PING_INTERVAL_IN_MS;
            this._statefulReconnectBufferSize = statefulReconnectBufferSize !== null && statefulReconnectBufferSize !== void 0 ? statefulReconnectBufferSize : DEFAULT_STATEFUL_RECONNECT_BUFFER_SIZE;
            this._logger = logger;
            this._protocol = protocol;
            this.connection = connection;
            this._reconnectPolicy = reconnectPolicy;
            this._handshakeProtocol = new HandshakeProtocol();
            this.connection.onreceive = (data) => this._processIncomingData(data);
            this.connection.onclose = (error) => this._connectionClosed(error);
            this._callbacks = {};
            this._methods = {};
            this._closedCallbacks = [];
            this._reconnectingCallbacks = [];
            this._reconnectedCallbacks = [];
            this._invocationId = 0;
            this._receivedHandshakeResponse = false;
            this._connectionState = HubConnectionState.Disconnected;
            this._connectionStarted = false;
            this._cachedPingMessage = this._protocol.writeMessage({ type: MessageType.Ping });
        }
        /** Indicates the state of the {@link HubConnection} to the server. */
        get state() {
            return this._connectionState;
        }
        /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
         *  in the disconnected state or if the negotiation step was skipped.
         */
        get connectionId() {
            return this.connection ? (this.connection.connectionId || null) : null;
        }
        /** Indicates the url of the {@link HubConnection} to the server. */
        get baseUrl() {
            return this.connection.baseUrl || "";
        }
        /**
         * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
         * Reconnecting states.
         * @param {string} url The url to connect to.
         */
        set baseUrl(url) {
            if (this._connectionState !== HubConnectionState.Disconnected && this._connectionState !== HubConnectionState.Reconnecting) {
                throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
            }
            if (!url) {
                throw new Error("The HubConnection url must be a valid url.");
            }
            this.connection.baseUrl = url;
        }
        /** Starts the connection.
         *
         * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
         */
        start() {
            this._startPromise = this._startWithStateTransitions();
            return this._startPromise;
        }
        async _startWithStateTransitions() {
            if (this._connectionState !== HubConnectionState.Disconnected) {
                return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
            }
            this._connectionState = HubConnectionState.Connecting;
            this._logger.log(LogLevel.Debug, "Starting HubConnection.");
            try {
                await this._startInternal();
                if (Platform.isBrowser) {
                    // Log when the browser freezes the tab so users know why their connection unexpectedly stopped working
                    window.document.addEventListener("freeze", this._freezeEventListener);
                }
                this._connectionState = HubConnectionState.Connected;
                this._connectionStarted = true;
                this._logger.log(LogLevel.Debug, "HubConnection connected successfully.");
            }
            catch (e) {
                this._connectionState = HubConnectionState.Disconnected;
                this._logger.log(LogLevel.Debug, `HubConnection failed to start successfully because of error '${e}'.`);
                return Promise.reject(e);
            }
        }
        async _startInternal() {
            this._stopDuringStartError = undefined;
            this._receivedHandshakeResponse = false;
            // Set up the promise before any connection is (re)started otherwise it could race with received messages
            const handshakePromise = new Promise((resolve, reject) => {
                this._handshakeResolver = resolve;
                this._handshakeRejecter = reject;
            });
            await this.connection.start(this._protocol.transferFormat);
            try {
                let version = this._protocol.version;
                if (!this.connection.features.reconnect) {
                    // Stateful Reconnect starts with HubProtocol version 2, newer clients connecting to older servers will fail to connect due to
                    // the handshake only supporting version 1, so we will try to send version 1 during the handshake to keep old servers working.
                    version = 1;
                }
                const handshakeRequest = {
                    protocol: this._protocol.name,
                    version,
                };
                this._logger.log(LogLevel.Debug, "Sending handshake request.");
                await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(handshakeRequest));
                this._logger.log(LogLevel.Information, `Using HubProtocol '${this._protocol.name}'.`);
                // defensively cleanup timeout in case we receive a message from the server before we finish start
                this._cleanupTimeout();
                this._resetTimeoutPeriod();
                this._resetKeepAliveInterval();
                await handshakePromise;
                // It's important to check the stopDuringStartError instead of just relying on the handshakePromise
                // being rejected on close, because this continuation can run after both the handshake completed successfully
                // and the connection was closed.
                if (this._stopDuringStartError) {
                    // It's important to throw instead of returning a rejected promise, because we don't want to allow any state
                    // transitions to occur between now and the calling code observing the exceptions. Returning a rejected promise
                    // will cause the calling continuation to get scheduled to run later.
                    // eslint-disable-next-line @typescript-eslint/no-throw-literal
                    throw this._stopDuringStartError;
                }
                const useStatefulReconnect = this.connection.features.reconnect || false;
                if (useStatefulReconnect) {
                    this._messageBuffer = new MessageBuffer(this._protocol, this.connection, this._statefulReconnectBufferSize);
                    this.connection.features.disconnected = this._messageBuffer._disconnected.bind(this._messageBuffer);
                    this.connection.features.resend = () => {
                        if (this._messageBuffer) {
                            return this._messageBuffer._resend();
                        }
                    };
                }
                if (!this.connection.features.inherentKeepAlive) {
                    await this._sendMessage(this._cachedPingMessage);
                }
            }
            catch (e) {
                this._logger.log(LogLevel.Debug, `Hub handshake failed with error '${e}' during start(). Stopping HubConnection.`);
                this._cleanupTimeout();
                this._cleanupPingTimer();
                // HttpConnection.stop() should not complete until after the onclose callback is invoked.
                // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
                await this.connection.stop(e);
                throw e;
            }
        }
        /** Stops the connection.
         *
         * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
         */
        async stop() {
            // Capture the start promise before the connection might be restarted in an onclose callback.
            const startPromise = this._startPromise;
            this.connection.features.reconnect = false;
            this._stopPromise = this._stopInternal();
            await this._stopPromise;
            try {
                // Awaiting undefined continues immediately
                await startPromise;
            }
            catch (e) {
                // This exception is returned to the user as a rejected Promise from the start method.
            }
        }
        _stopInternal(error) {
            if (this._connectionState === HubConnectionState.Disconnected) {
                this._logger.log(LogLevel.Debug, `Call to HubConnection.stop(${error}) ignored because it is already in the disconnected state.`);
                return Promise.resolve();
            }
            if (this._connectionState === HubConnectionState.Disconnecting) {
                this._logger.log(LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
                return this._stopPromise;
            }
            const state = this._connectionState;
            this._connectionState = HubConnectionState.Disconnecting;
            this._logger.log(LogLevel.Debug, "Stopping HubConnection.");
            if (this._reconnectDelayHandle) {
                // We're in a reconnect delay which means the underlying connection is currently already stopped.
                // Just clear the handle to stop the reconnect loop (which no one is waiting on thankfully) and
                // fire the onclose callbacks.
                this._logger.log(LogLevel.Debug, "Connection stopped during reconnect delay. Done reconnecting.");
                clearTimeout(this._reconnectDelayHandle);
                this._reconnectDelayHandle = undefined;
                this._completeClose();
                return Promise.resolve();
            }
            if (state === HubConnectionState.Connected) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this._sendCloseMessage();
            }
            this._cleanupTimeout();
            this._cleanupPingTimer();
            this._stopDuringStartError = error || new AbortError("The connection was stopped before the hub handshake could complete.");
            // HttpConnection.stop() should not complete until after either HttpConnection.start() fails
            // or the onclose callback is invoked. The onclose callback will transition the HubConnection
            // to the disconnected state if need be before HttpConnection.stop() completes.
            return this.connection.stop(error);
        }
        async _sendCloseMessage() {
            try {
                await this._sendWithProtocol(this._createCloseMessage());
            }
            catch {
                // Ignore, this is a best effort attempt to let the server know the client closed gracefully.
            }
        }
        /** Invokes a streaming hub method on the server using the specified name and arguments.
         *
         * @typeparam T The type of the items returned by the server.
         * @param {string} methodName The name of the server method to invoke.
         * @param {any[]} args The arguments used to invoke the server method.
         * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
         */
        stream(methodName, ...args) {
            const [streams, streamIds] = this._replaceStreamingParams(args);
            const invocationDescriptor = this._createStreamInvocation(methodName, args, streamIds);
            // eslint-disable-next-line prefer-const
            let promiseQueue;
            const subject = new Subject();
            subject.cancelCallback = () => {
                const cancelInvocation = this._createCancelInvocation(invocationDescriptor.invocationId);
                delete this._callbacks[invocationDescriptor.invocationId];
                return promiseQueue.then(() => {
                    return this._sendWithProtocol(cancelInvocation);
                });
            };
            this._callbacks[invocationDescriptor.invocationId] = (invocationEvent, error) => {
                if (error) {
                    subject.error(error);
                    return;
                }
                else if (invocationEvent) {
                    // invocationEvent will not be null when an error is not passed to the callback
                    if (invocationEvent.type === MessageType.Completion) {
                        if (invocationEvent.error) {
                            subject.error(new Error(invocationEvent.error));
                        }
                        else {
                            subject.complete();
                        }
                    }
                    else {
                        subject.next((invocationEvent.item));
                    }
                }
            };
            promiseQueue = this._sendWithProtocol(invocationDescriptor)
                .catch((e) => {
                subject.error(e);
                delete this._callbacks[invocationDescriptor.invocationId];
            });
            this._launchStreams(streams, promiseQueue);
            return subject;
        }
        _sendMessage(message) {
            this._resetKeepAliveInterval();
            return this.connection.send(message);
        }
        /**
         * Sends a js object to the server.
         * @param message The js object to serialize and send.
         */
        _sendWithProtocol(message) {
            if (this._messageBuffer) {
                return this._messageBuffer._send(message);
            }
            else {
                return this._sendMessage(this._protocol.writeMessage(message));
            }
        }
        /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
         *
         * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
         * be processing the invocation.
         *
         * @param {string} methodName The name of the server method to invoke.
         * @param {any[]} args The arguments used to invoke the server method.
         * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
         */
        send(methodName, ...args) {
            const [streams, streamIds] = this._replaceStreamingParams(args);
            const sendPromise = this._sendWithProtocol(this._createInvocation(methodName, args, true, streamIds));
            this._launchStreams(streams, sendPromise);
            return sendPromise;
        }
        /** Invokes a hub method on the server using the specified name and arguments.
         *
         * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
         * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
         * resolving the Promise.
         *
         * @typeparam T The expected return type.
         * @param {string} methodName The name of the server method to invoke.
         * @param {any[]} args The arguments used to invoke the server method.
         * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
         */
        invoke(methodName, ...args) {
            const [streams, streamIds] = this._replaceStreamingParams(args);
            const invocationDescriptor = this._createInvocation(methodName, args, false, streamIds);
            const p = new Promise((resolve, reject) => {
                // invocationId will always have a value for a non-blocking invocation
                this._callbacks[invocationDescriptor.invocationId] = (invocationEvent, error) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    else if (invocationEvent) {
                        // invocationEvent will not be null when an error is not passed to the callback
                        if (invocationEvent.type === MessageType.Completion) {
                            if (invocationEvent.error) {
                                reject(new Error(invocationEvent.error));
                            }
                            else {
                                resolve(invocationEvent.result);
                            }
                        }
                        else {
                            reject(new Error(`Unexpected message type: ${invocationEvent.type}`));
                        }
                    }
                };
                const promiseQueue = this._sendWithProtocol(invocationDescriptor)
                    .catch((e) => {
                    reject(e);
                    // invocationId will always have a value for a non-blocking invocation
                    delete this._callbacks[invocationDescriptor.invocationId];
                });
                this._launchStreams(streams, promiseQueue);
            });
            return p;
        }
        on(methodName, newMethod) {
            if (!methodName || !newMethod) {
                return;
            }
            methodName = methodName.toLowerCase();
            if (!this._methods[methodName]) {
                this._methods[methodName] = [];
            }
            // Preventing adding the same handler multiple times.
            if (this._methods[methodName].indexOf(newMethod) !== -1) {
                return;
            }
            this._methods[methodName].push(newMethod);
        }
        off(methodName, method) {
            if (!methodName) {
                return;
            }
            methodName = methodName.toLowerCase();
            const handlers = this._methods[methodName];
            if (!handlers) {
                return;
            }
            if (method) {
                const removeIdx = handlers.indexOf(method);
                if (removeIdx !== -1) {
                    handlers.splice(removeIdx, 1);
                    if (handlers.length === 0) {
                        delete this._methods[methodName];
                    }
                }
            }
            else {
                delete this._methods[methodName];
            }
        }
        /** Registers a handler that will be invoked when the connection is closed.
         *
         * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
         */
        onclose(callback) {
            if (callback) {
                this._closedCallbacks.push(callback);
            }
        }
        /** Registers a handler that will be invoked when the connection starts reconnecting.
         *
         * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
         */
        onreconnecting(callback) {
            if (callback) {
                this._reconnectingCallbacks.push(callback);
            }
        }
        /** Registers a handler that will be invoked when the connection successfully reconnects.
         *
         * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
         */
        onreconnected(callback) {
            if (callback) {
                this._reconnectedCallbacks.push(callback);
            }
        }
        _processIncomingData(data) {
            this._cleanupTimeout();
            if (!this._receivedHandshakeResponse) {
                data = this._processHandshakeResponse(data);
                this._receivedHandshakeResponse = true;
            }
            // Data may have all been read when processing handshake response
            if (data) {
                // Parse the messages
                const messages = this._protocol.parseMessages(data, this._logger);
                for (const message of messages) {
                    if (this._messageBuffer && !this._messageBuffer._shouldProcessMessage(message)) {
                        // Don't process the message, we are either waiting for a SequenceMessage or received a duplicate message
                        continue;
                    }
                    switch (message.type) {
                        case MessageType.Invocation:
                            this._invokeClientMethod(message)
                                .catch((e) => {
                                this._logger.log(LogLevel.Error, `Invoke client method threw error: ${getErrorString(e)}`);
                            });
                            break;
                        case MessageType.StreamItem:
                        case MessageType.Completion: {
                            const callback = this._callbacks[message.invocationId];
                            if (callback) {
                                if (message.type === MessageType.Completion) {
                                    delete this._callbacks[message.invocationId];
                                }
                                try {
                                    callback(message);
                                }
                                catch (e) {
                                    this._logger.log(LogLevel.Error, `Stream callback threw error: ${getErrorString(e)}`);
                                }
                            }
                            break;
                        }
                        case MessageType.Ping:
                            // Don't care about pings
                            break;
                        case MessageType.Close: {
                            this._logger.log(LogLevel.Information, "Close message received from server.");
                            const error = message.error ? new Error("Server returned an error on close: " + message.error) : undefined;
                            if (message.allowReconnect === true) {
                                // It feels wrong not to await connection.stop() here, but processIncomingData is called as part of an onreceive callback which is not async,
                                // this is already the behavior for serverTimeout(), and HttpConnection.Stop() should catch and log all possible exceptions.
                                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                this.connection.stop(error);
                            }
                            else {
                                // We cannot await stopInternal() here, but subsequent calls to stop() will await this if stopInternal() is still ongoing.
                                this._stopPromise = this._stopInternal(error);
                            }
                            break;
                        }
                        case MessageType.Ack:
                            if (this._messageBuffer) {
                                this._messageBuffer._ack(message);
                            }
                            break;
                        case MessageType.Sequence:
                            if (this._messageBuffer) {
                                this._messageBuffer._resetSequence(message);
                            }
                            break;
                        default:
                            this._logger.log(LogLevel.Warning, `Invalid message type: ${message.type}.`);
                            break;
                    }
                }
            }
            this._resetTimeoutPeriod();
        }
        _processHandshakeResponse(data) {
            let responseMessage;
            let remainingData;
            try {
                [remainingData, responseMessage] = this._handshakeProtocol.parseHandshakeResponse(data);
            }
            catch (e) {
                const message = "Error parsing handshake response: " + e;
                this._logger.log(LogLevel.Error, message);
                const error = new Error(message);
                this._handshakeRejecter(error);
                throw error;
            }
            if (responseMessage.error) {
                const message = "Server returned handshake error: " + responseMessage.error;
                this._logger.log(LogLevel.Error, message);
                const error = new Error(message);
                this._handshakeRejecter(error);
                throw error;
            }
            else {
                this._logger.log(LogLevel.Debug, "Server handshake complete.");
            }
            this._handshakeResolver();
            return remainingData;
        }
        _resetKeepAliveInterval() {
            if (this.connection.features.inherentKeepAlive) {
                return;
            }
            // Set the time we want the next keep alive to be sent
            // Timer will be setup on next message receive
            this._nextKeepAlive = new Date().getTime() + this.keepAliveIntervalInMilliseconds;
            this._cleanupPingTimer();
        }
        _resetTimeoutPeriod() {
            if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
                // Set the timeout timer
                this._timeoutHandle = setTimeout(() => this.serverTimeout(), this.serverTimeoutInMilliseconds);
                // Set keepAlive timer if there isn't one
                if (this._pingServerHandle === undefined) {
                    let nextPing = this._nextKeepAlive - new Date().getTime();
                    if (nextPing < 0) {
                        nextPing = 0;
                    }
                    // The timer needs to be set from a networking callback to avoid Chrome timer throttling from causing timers to run once a minute
                    this._pingServerHandle = setTimeout(async () => {
                        if (this._connectionState === HubConnectionState.Connected) {
                            try {
                                await this._sendMessage(this._cachedPingMessage);
                            }
                            catch {
                                // We don't care about the error. It should be seen elsewhere in the client.
                                // The connection is probably in a bad or closed state now, cleanup the timer so it stops triggering
                                this._cleanupPingTimer();
                            }
                        }
                    }, nextPing);
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        serverTimeout() {
            // The server hasn't talked to us in a while. It doesn't like us anymore ... :(
            // Terminate the connection, but we don't need to wait on the promise. This could trigger reconnecting.
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
        }
        async _invokeClientMethod(invocationMessage) {
            const methodName = invocationMessage.target.toLowerCase();
            const methods = this._methods[methodName];
            if (!methods) {
                this._logger.log(LogLevel.Warning, `No client method with the name '${methodName}' found.`);
                // No handlers provided by client but the server is expecting a response still, so we send an error
                if (invocationMessage.invocationId) {
                    this._logger.log(LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
                    await this._sendWithProtocol(this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null));
                }
                return;
            }
            // Avoid issues with handlers removing themselves thus modifying the list while iterating through it
            const methodsCopy = methods.slice();
            // Server expects a response
            const expectsResponse = invocationMessage.invocationId ? true : false;
            // We preserve the last result or exception but still call all handlers
            let res;
            let exception;
            let completionMessage;
            for (const m of methodsCopy) {
                try {
                    const prevRes = res;
                    res = await m.apply(this, invocationMessage.arguments);
                    if (expectsResponse && res && prevRes) {
                        this._logger.log(LogLevel.Error, `Multiple results provided for '${methodName}'. Sending error to server.`);
                        completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `Client provided multiple results.`, null);
                    }
                    // Ignore exception if we got a result after, the exception will be logged
                    exception = undefined;
                }
                catch (e) {
                    exception = e;
                    this._logger.log(LogLevel.Error, `A callback for the method '${methodName}' threw error '${e}'.`);
                }
            }
            if (completionMessage) {
                await this._sendWithProtocol(completionMessage);
            }
            else if (expectsResponse) {
                // If there is an exception that means either no result was given or a handler after a result threw
                if (exception) {
                    completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `${exception}`, null);
                }
                else if (res !== undefined) {
                    completionMessage = this._createCompletionMessage(invocationMessage.invocationId, null, res);
                }
                else {
                    this._logger.log(LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
                    // Client didn't provide a result or throw from a handler, server expects a response so we send an error
                    completionMessage = this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null);
                }
                await this._sendWithProtocol(completionMessage);
            }
            else {
                if (res) {
                    this._logger.log(LogLevel.Error, `Result given for '${methodName}' method but server is not expecting a result.`);
                }
            }
        }
        _connectionClosed(error) {
            this._logger.log(LogLevel.Debug, `HubConnection.connectionClosed(${error}) called while in state ${this._connectionState}.`);
            // Triggering this.handshakeRejecter is insufficient because it could already be resolved without the continuation having run yet.
            this._stopDuringStartError = this._stopDuringStartError || error || new AbortError("The underlying connection was closed before the hub handshake could complete.");
            // If the handshake is in progress, start will be waiting for the handshake promise, so we complete it.
            // If it has already completed, this should just noop.
            if (this._handshakeResolver) {
                this._handshakeResolver();
            }
            this._cancelCallbacksWithError(error || new Error("Invocation canceled due to the underlying connection being closed."));
            this._cleanupTimeout();
            this._cleanupPingTimer();
            if (this._connectionState === HubConnectionState.Disconnecting) {
                this._completeClose(error);
            }
            else if (this._connectionState === HubConnectionState.Connected && this._reconnectPolicy) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this._reconnect(error);
            }
            else if (this._connectionState === HubConnectionState.Connected) {
                this._completeClose(error);
            }
            // If none of the above if conditions were true were called the HubConnection must be in either:
            // 1. The Connecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail it.
            // 2. The Reconnecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail the current reconnect attempt
            //    and potentially continue the reconnect() loop.
            // 3. The Disconnected state in which case we're already done.
        }
        _completeClose(error) {
            if (this._connectionStarted) {
                this._connectionState = HubConnectionState.Disconnected;
                this._connectionStarted = false;
                if (this._messageBuffer) {
                    this._messageBuffer._dispose(error !== null && error !== void 0 ? error : new Error("Connection closed."));
                    this._messageBuffer = undefined;
                }
                if (Platform.isBrowser) {
                    window.document.removeEventListener("freeze", this._freezeEventListener);
                }
                try {
                    this._closedCallbacks.forEach((c) => c.apply(this, [error]));
                }
                catch (e) {
                    this._logger.log(LogLevel.Error, `An onclose callback called with error '${error}' threw error '${e}'.`);
                }
            }
        }
        async _reconnect(error) {
            const reconnectStartTime = Date.now();
            let previousReconnectAttempts = 0;
            let retryError = error !== undefined ? error : new Error("Attempting to reconnect due to a unknown error.");
            let nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts++, 0, retryError);
            if (nextRetryDelay === null) {
                this._logger.log(LogLevel.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");
                this._completeClose(error);
                return;
            }
            this._connectionState = HubConnectionState.Reconnecting;
            if (error) {
                this._logger.log(LogLevel.Information, `Connection reconnecting because of error '${error}'.`);
            }
            else {
                this._logger.log(LogLevel.Information, "Connection reconnecting.");
            }
            if (this._reconnectingCallbacks.length !== 0) {
                try {
                    this._reconnectingCallbacks.forEach((c) => c.apply(this, [error]));
                }
                catch (e) {
                    this._logger.log(LogLevel.Error, `An onreconnecting callback called with error '${error}' threw error '${e}'.`);
                }
                // Exit early if an onreconnecting callback called connection.stop().
                if (this._connectionState !== HubConnectionState.Reconnecting) {
                    this._logger.log(LogLevel.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
                    return;
                }
            }
            while (nextRetryDelay !== null) {
                this._logger.log(LogLevel.Information, `Reconnect attempt number ${previousReconnectAttempts} will start in ${nextRetryDelay} ms.`);
                await new Promise((resolve) => {
                    this._reconnectDelayHandle = setTimeout(resolve, nextRetryDelay);
                });
                this._reconnectDelayHandle = undefined;
                if (this._connectionState !== HubConnectionState.Reconnecting) {
                    this._logger.log(LogLevel.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
                    return;
                }
                try {
                    await this._startInternal();
                    this._connectionState = HubConnectionState.Connected;
                    this._logger.log(LogLevel.Information, "HubConnection reconnected successfully.");
                    if (this._reconnectedCallbacks.length !== 0) {
                        try {
                            this._reconnectedCallbacks.forEach((c) => c.apply(this, [this.connection.connectionId]));
                        }
                        catch (e) {
                            this._logger.log(LogLevel.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${e}'.`);
                        }
                    }
                    return;
                }
                catch (e) {
                    this._logger.log(LogLevel.Information, `Reconnect attempt failed because of error '${e}'.`);
                    if (this._connectionState !== HubConnectionState.Reconnecting) {
                        this._logger.log(LogLevel.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`);
                        // The TypeScript compiler thinks that connectionState must be Connected here. The TypeScript compiler is wrong.
                        if (this._connectionState === HubConnectionState.Disconnecting) {
                            this._completeClose();
                        }
                        return;
                    }
                    retryError = e instanceof Error ? e : new Error(e.toString());
                    nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts++, Date.now() - reconnectStartTime, retryError);
                }
            }
            this._logger.log(LogLevel.Information, `Reconnect retries have been exhausted after ${Date.now() - reconnectStartTime} ms and ${previousReconnectAttempts} failed attempts. Connection disconnecting.`);
            this._completeClose();
        }
        _getNextRetryDelay(previousRetryCount, elapsedMilliseconds, retryReason) {
            try {
                return this._reconnectPolicy.nextRetryDelayInMilliseconds({
                    elapsedMilliseconds,
                    previousRetryCount,
                    retryReason,
                });
            }
            catch (e) {
                this._logger.log(LogLevel.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${previousRetryCount}, ${elapsedMilliseconds}) threw error '${e}'.`);
                return null;
            }
        }
        _cancelCallbacksWithError(error) {
            const callbacks = this._callbacks;
            this._callbacks = {};
            Object.keys(callbacks)
                .forEach((key) => {
                const callback = callbacks[key];
                try {
                    callback(null, error);
                }
                catch (e) {
                    this._logger.log(LogLevel.Error, `Stream 'error' callback called with '${error}' threw error: ${getErrorString(e)}`);
                }
            });
        }
        _cleanupPingTimer() {
            if (this._pingServerHandle) {
                clearTimeout(this._pingServerHandle);
                this._pingServerHandle = undefined;
            }
        }
        _cleanupTimeout() {
            if (this._timeoutHandle) {
                clearTimeout(this._timeoutHandle);
            }
        }
        _createInvocation(methodName, args, nonblocking, streamIds) {
            if (nonblocking) {
                if (streamIds.length !== 0) {
                    return {
                        arguments: args,
                        streamIds,
                        target: methodName,
                        type: MessageType.Invocation,
                    };
                }
                else {
                    return {
                        arguments: args,
                        target: methodName,
                        type: MessageType.Invocation,
                    };
                }
            }
            else {
                const invocationId = this._invocationId;
                this._invocationId++;
                if (streamIds.length !== 0) {
                    return {
                        arguments: args,
                        invocationId: invocationId.toString(),
                        streamIds,
                        target: methodName,
                        type: MessageType.Invocation,
                    };
                }
                else {
                    return {
                        arguments: args,
                        invocationId: invocationId.toString(),
                        target: methodName,
                        type: MessageType.Invocation,
                    };
                }
            }
        }
        _launchStreams(streams, promiseQueue) {
            if (streams.length === 0) {
                return;
            }
            // Synchronize stream data so they arrive in-order on the server
            if (!promiseQueue) {
                promiseQueue = Promise.resolve();
            }
            // We want to iterate over the keys, since the keys are the stream ids
            // eslint-disable-next-line guard-for-in
            for (const streamId in streams) {
                streams[streamId].subscribe({
                    complete: () => {
                        promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createCompletionMessage(streamId)));
                    },
                    error: (err) => {
                        let message;
                        if (err instanceof Error) {
                            message = err.message;
                        }
                        else if (err && err.toString) {
                            message = err.toString();
                        }
                        else {
                            message = "Unknown error";
                        }
                        promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createCompletionMessage(streamId, message)));
                    },
                    next: (item) => {
                        promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createStreamItemMessage(streamId, item)));
                    },
                });
            }
        }
        _replaceStreamingParams(args) {
            const streams = [];
            const streamIds = [];
            for (let i = 0; i < args.length; i++) {
                const argument = args[i];
                if (this._isObservable(argument)) {
                    const streamId = this._invocationId;
                    this._invocationId++;
                    // Store the stream for later use
                    streams[streamId] = argument;
                    streamIds.push(streamId.toString());
                    // remove stream from args
                    args.splice(i, 1);
                }
            }
            return [streams, streamIds];
        }
        _isObservable(arg) {
            // This allows other stream implementations to just work (like rxjs)
            return arg && arg.subscribe && typeof arg.subscribe === "function";
        }
        _createStreamInvocation(methodName, args, streamIds) {
            const invocationId = this._invocationId;
            this._invocationId++;
            if (streamIds.length !== 0) {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    streamIds,
                    target: methodName,
                    type: MessageType.StreamInvocation,
                };
            }
            else {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    target: methodName,
                    type: MessageType.StreamInvocation,
                };
            }
        }
        _createCancelInvocation(id) {
            return {
                invocationId: id,
                type: MessageType.CancelInvocation,
            };
        }
        _createStreamItemMessage(id, item) {
            return {
                invocationId: id,
                item,
                type: MessageType.StreamItem,
            };
        }
        _createCompletionMessage(id, error, result) {
            if (error) {
                return {
                    error,
                    invocationId: id,
                    type: MessageType.Completion,
                };
            }
            return {
                invocationId: id,
                result,
                type: MessageType.Completion,
            };
        }
        _createCloseMessage() {
            return { type: MessageType.Close };
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    // 0, 2, 10, 30 second delays before reconnect attempts.
    const DEFAULT_RETRY_DELAYS_IN_MILLISECONDS = [0, 2000, 10000, 30000, null];
    /** @private */
    class DefaultReconnectPolicy {
        constructor(retryDelays) {
            this._retryDelays = retryDelays !== undefined ? [...retryDelays, null] : DEFAULT_RETRY_DELAYS_IN_MILLISECONDS;
        }
        nextRetryDelayInMilliseconds(retryContext) {
            return this._retryDelays[retryContext.previousRetryCount];
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    class HeaderNames {
    }
    HeaderNames.Authorization = "Authorization";
    HeaderNames.Cookie = "Cookie";

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** @private */
    class AccessTokenHttpClient extends HttpClient {
        constructor(innerClient, accessTokenFactory) {
            super();
            this._innerClient = innerClient;
            this._accessTokenFactory = accessTokenFactory;
        }
        async send(request) {
            let allowRetry = true;
            if (this._accessTokenFactory && (!this._accessToken || (request.url && request.url.indexOf("/negotiate?") > 0))) {
                // don't retry if the request is a negotiate or if we just got a potentially new token from the access token factory
                allowRetry = false;
                this._accessToken = await this._accessTokenFactory();
            }
            this._setAuthorizationHeader(request);
            const response = await this._innerClient.send(request);
            if (allowRetry && response.statusCode === 401 && this._accessTokenFactory) {
                this._accessToken = await this._accessTokenFactory();
                this._setAuthorizationHeader(request);
                return await this._innerClient.send(request);
            }
            return response;
        }
        _setAuthorizationHeader(request) {
            if (!request.headers) {
                request.headers = {};
            }
            if (this._accessToken) {
                request.headers[HeaderNames.Authorization] = `Bearer ${this._accessToken}`;
            }
            // don't remove the header if there isn't an access token factory, the user manually added the header in this case
            else if (this._accessTokenFactory) {
                if (request.headers[HeaderNames.Authorization]) {
                    delete request.headers[HeaderNames.Authorization];
                }
            }
        }
        getCookieString(url) {
            return this._innerClient.getCookieString(url);
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    // This will be treated as a bit flag in the future, so we keep it using power-of-two values.
    /** Specifies a specific HTTP transport type. */
    var HttpTransportType;
    (function (HttpTransportType) {
        /** Specifies no transport preference. */
        HttpTransportType[HttpTransportType["None"] = 0] = "None";
        /** Specifies the WebSockets transport. */
        HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
        /** Specifies the Server-Sent Events transport. */
        HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
        /** Specifies the Long Polling transport. */
        HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
    })(HttpTransportType || (HttpTransportType = {}));
    /** Specifies the transfer format for a connection. */
    var TransferFormat;
    (function (TransferFormat) {
        /** Specifies that only text data will be transmitted over the connection. */
        TransferFormat[TransferFormat["Text"] = 1] = "Text";
        /** Specifies that binary data will be transmitted over the connection. */
        TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
    })(TransferFormat || (TransferFormat = {}));

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    // Rough polyfill of https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    // We don't actually ever use the API being polyfilled, we always use the polyfill because
    // it's a very new API right now.
    // Not exported from index.
    /** @private */
    let AbortController$1 = class AbortController {
        constructor() {
            this._isAborted = false;
            this.onabort = null;
        }
        abort() {
            if (!this._isAborted) {
                this._isAborted = true;
                if (this.onabort) {
                    this.onabort();
                }
            }
        }
        get signal() {
            return this;
        }
        get aborted() {
            return this._isAborted;
        }
    };

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    // Not exported from 'index', this type is internal.
    /** @private */
    class LongPollingTransport {
        // This is an internal type, not exported from 'index' so this is really just internal.
        get pollAborted() {
            return this._pollAbort.aborted;
        }
        constructor(httpClient, logger, options) {
            this._httpClient = httpClient;
            this._logger = logger;
            this._pollAbort = new AbortController$1();
            this._options = options;
            this._running = false;
            this.onreceive = null;
            this.onclose = null;
        }
        async connect(url, transferFormat) {
            Arg.isRequired(url, "url");
            Arg.isRequired(transferFormat, "transferFormat");
            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
            this._url = url;
            this._logger.log(LogLevel.Trace, "(LongPolling transport) Connecting.");
            // Allow binary format on Node and Browsers that support binary content (indicated by the presence of responseType property)
            if (transferFormat === TransferFormat.Binary &&
                (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
                throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
            }
            const [name, value] = getUserAgentHeader();
            const headers = { [name]: value, ...this._options.headers };
            const pollOptions = {
                abortSignal: this._pollAbort.signal,
                headers,
                timeout: 100000,
                withCredentials: this._options.withCredentials,
            };
            if (transferFormat === TransferFormat.Binary) {
                pollOptions.responseType = "arraybuffer";
            }
            // Make initial long polling request
            // Server uses first long polling request to finish initializing connection and it returns without data
            const pollUrl = `${url}&_=${Date.now()}`;
            this._logger.log(LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
            const response = await this._httpClient.get(pollUrl, pollOptions);
            if (response.statusCode !== 200) {
                this._logger.log(LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
                // Mark running as false so that the poll immediately ends and runs the close logic
                this._closeError = new HttpError(response.statusText || "", response.statusCode);
                this._running = false;
            }
            else {
                this._running = true;
            }
            this._receiving = this._poll(this._url, pollOptions);
        }
        async _poll(url, pollOptions) {
            try {
                while (this._running) {
                    try {
                        const pollUrl = `${url}&_=${Date.now()}`;
                        this._logger.log(LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
                        const response = await this._httpClient.get(pollUrl, pollOptions);
                        if (response.statusCode === 204) {
                            this._logger.log(LogLevel.Information, "(LongPolling transport) Poll terminated by server.");
                            this._running = false;
                        }
                        else if (response.statusCode !== 200) {
                            this._logger.log(LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
                            // Unexpected status code
                            this._closeError = new HttpError(response.statusText || "", response.statusCode);
                            this._running = false;
                        }
                        else {
                            // Process the response
                            if (response.content) {
                                this._logger.log(LogLevel.Trace, `(LongPolling transport) data received. ${getDataDetail(response.content, this._options.logMessageContent)}.`);
                                if (this.onreceive) {
                                    this.onreceive(response.content);
                                }
                            }
                            else {
                                // This is another way timeout manifest.
                                this._logger.log(LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                        }
                    }
                    catch (e) {
                        if (!this._running) {
                            // Log but disregard errors that occur after stopping
                            this._logger.log(LogLevel.Trace, `(LongPolling transport) Poll errored after shutdown: ${e.message}`);
                        }
                        else {
                            if (e instanceof TimeoutError) {
                                // Ignore timeouts and reissue the poll.
                                this._logger.log(LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                            else {
                                // Close the connection with the error as the result.
                                this._closeError = e;
                                this._running = false;
                            }
                        }
                    }
                }
            }
            finally {
                this._logger.log(LogLevel.Trace, "(LongPolling transport) Polling complete.");
                // We will reach here with pollAborted==false when the server returned a response causing the transport to stop.
                // If pollAborted==true then client initiated the stop and the stop method will raise the close event after DELETE is sent.
                if (!this.pollAborted) {
                    this._raiseOnClose();
                }
            }
        }
        async send(data) {
            if (!this._running) {
                return Promise.reject(new Error("Cannot send until the transport is connected"));
            }
            return sendMessage(this._logger, "LongPolling", this._httpClient, this._url, data, this._options);
        }
        async stop() {
            this._logger.log(LogLevel.Trace, "(LongPolling transport) Stopping polling.");
            // Tell receiving loop to stop, abort any current request, and then wait for it to finish
            this._running = false;
            this._pollAbort.abort();
            try {
                await this._receiving;
                // Send DELETE to clean up long polling on the server
                this._logger.log(LogLevel.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
                const headers = {};
                const [name, value] = getUserAgentHeader();
                headers[name] = value;
                const deleteOptions = {
                    headers: { ...headers, ...this._options.headers },
                    timeout: this._options.timeout,
                    withCredentials: this._options.withCredentials,
                };
                let error;
                try {
                    await this._httpClient.delete(this._url, deleteOptions);
                }
                catch (err) {
                    error = err;
                }
                if (error) {
                    if (error instanceof HttpError) {
                        if (error.statusCode === 404) {
                            this._logger.log(LogLevel.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.");
                        }
                        else {
                            this._logger.log(LogLevel.Trace, `(LongPolling transport) Error sending a DELETE request: ${error}`);
                        }
                    }
                }
                else {
                    this._logger.log(LogLevel.Trace, "(LongPolling transport) DELETE request accepted.");
                }
            }
            finally {
                this._logger.log(LogLevel.Trace, "(LongPolling transport) Stop finished.");
                // Raise close event here instead of in polling
                // It needs to happen after the DELETE request is sent
                this._raiseOnClose();
            }
        }
        _raiseOnClose() {
            if (this.onclose) {
                let logMessage = "(LongPolling transport) Firing onclose event.";
                if (this._closeError) {
                    logMessage += " Error: " + this._closeError;
                }
                this._logger.log(LogLevel.Trace, logMessage);
                this.onclose(this._closeError);
            }
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** @private */
    class ServerSentEventsTransport {
        constructor(httpClient, accessToken, logger, options) {
            this._httpClient = httpClient;
            this._accessToken = accessToken;
            this._logger = logger;
            this._options = options;
            this.onreceive = null;
            this.onclose = null;
        }
        async connect(url, transferFormat) {
            Arg.isRequired(url, "url");
            Arg.isRequired(transferFormat, "transferFormat");
            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
            this._logger.log(LogLevel.Trace, "(SSE transport) Connecting.");
            // set url before accessTokenFactory because this._url is only for send and we set the auth header instead of the query string for send
            this._url = url;
            if (this._accessToken) {
                url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`;
            }
            return new Promise((resolve, reject) => {
                let opened = false;
                if (transferFormat !== TransferFormat.Text) {
                    reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
                    return;
                }
                let eventSource;
                if (Platform.isBrowser || Platform.isWebWorker) {
                    eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials });
                }
                else {
                    // Non-browser passes cookies via the dictionary
                    const cookies = this._httpClient.getCookieString(url);
                    const headers = {};
                    headers.Cookie = cookies;
                    const [name, value] = getUserAgentHeader();
                    headers[name] = value;
                    eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials, headers: { ...headers, ...this._options.headers } });
                }
                try {
                    eventSource.onmessage = (e) => {
                        if (this.onreceive) {
                            try {
                                this._logger.log(LogLevel.Trace, `(SSE transport) data received. ${getDataDetail(e.data, this._options.logMessageContent)}.`);
                                this.onreceive(e.data);
                            }
                            catch (error) {
                                this._close(error);
                                return;
                            }
                        }
                    };
                    // @ts-ignore: not using event on purpose
                    eventSource.onerror = (e) => {
                        // EventSource doesn't give any useful information about server side closes.
                        if (opened) {
                            this._close();
                        }
                        else {
                            reject(new Error("EventSource failed to connect. The connection could not be found on the server,"
                                + " either the connection ID is not present on the server, or a proxy is refusing/buffering the connection."
                                + " If you have multiple servers check that sticky sessions are enabled."));
                        }
                    };
                    eventSource.onopen = () => {
                        this._logger.log(LogLevel.Information, `SSE connected to ${this._url}`);
                        this._eventSource = eventSource;
                        opened = true;
                        resolve();
                    };
                }
                catch (e) {
                    reject(e);
                    return;
                }
            });
        }
        async send(data) {
            if (!this._eventSource) {
                return Promise.reject(new Error("Cannot send until the transport is connected"));
            }
            return sendMessage(this._logger, "SSE", this._httpClient, this._url, data, this._options);
        }
        stop() {
            this._close();
            return Promise.resolve();
        }
        _close(e) {
            if (this._eventSource) {
                this._eventSource.close();
                this._eventSource = undefined;
                if (this.onclose) {
                    this.onclose(e);
                }
            }
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    /** @private */
    class WebSocketTransport {
        constructor(httpClient, accessTokenFactory, logger, logMessageContent, webSocketConstructor, headers) {
            this._logger = logger;
            this._accessTokenFactory = accessTokenFactory;
            this._logMessageContent = logMessageContent;
            this._webSocketConstructor = webSocketConstructor;
            this._httpClient = httpClient;
            this.onreceive = null;
            this.onclose = null;
            this._headers = headers;
        }
        async connect(url, transferFormat) {
            Arg.isRequired(url, "url");
            Arg.isRequired(transferFormat, "transferFormat");
            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
            this._logger.log(LogLevel.Trace, "(WebSockets transport) Connecting.");
            let token;
            if (this._accessTokenFactory) {
                token = await this._accessTokenFactory();
            }
            return new Promise((resolve, reject) => {
                url = url.replace(/^http/, "ws");
                let webSocket;
                const cookies = this._httpClient.getCookieString(url);
                let opened = false;
                if (Platform.isNode || Platform.isReactNative) {
                    const headers = {};
                    const [name, value] = getUserAgentHeader();
                    headers[name] = value;
                    if (token) {
                        headers[HeaderNames.Authorization] = `Bearer ${token}`;
                    }
                    if (cookies) {
                        headers[HeaderNames.Cookie] = cookies;
                    }
                    // Only pass headers when in non-browser environments
                    webSocket = new this._webSocketConstructor(url, undefined, {
                        headers: { ...headers, ...this._headers },
                    });
                }
                else {
                    if (token) {
                        url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(token)}`;
                    }
                }
                if (!webSocket) {
                    // Chrome is not happy with passing 'undefined' as protocol
                    webSocket = new this._webSocketConstructor(url);
                }
                if (transferFormat === TransferFormat.Binary) {
                    webSocket.binaryType = "arraybuffer";
                }
                webSocket.onopen = (_event) => {
                    this._logger.log(LogLevel.Information, `WebSocket connected to ${url}.`);
                    this._webSocket = webSocket;
                    opened = true;
                    resolve();
                };
                webSocket.onerror = (event) => {
                    let error = null;
                    // ErrorEvent is a browser only type we need to check if the type exists before using it
                    if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                        error = event.error;
                    }
                    else {
                        error = "There was an error with the transport";
                    }
                    this._logger.log(LogLevel.Information, `(WebSockets transport) ${error}.`);
                };
                webSocket.onmessage = (message) => {
                    this._logger.log(LogLevel.Trace, `(WebSockets transport) data received. ${getDataDetail(message.data, this._logMessageContent)}.`);
                    if (this.onreceive) {
                        try {
                            this.onreceive(message.data);
                        }
                        catch (error) {
                            this._close(error);
                            return;
                        }
                    }
                };
                webSocket.onclose = (event) => {
                    // Don't call close handler if connection was never established
                    // We'll reject the connect call instead
                    if (opened) {
                        this._close(event);
                    }
                    else {
                        let error = null;
                        // ErrorEvent is a browser only type we need to check if the type exists before using it
                        if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                            error = event.error;
                        }
                        else {
                            error = "WebSocket failed to connect. The connection could not be found on the server,"
                                + " either the endpoint may not be a SignalR endpoint,"
                                + " the connection ID is not present on the server, or there is a proxy blocking WebSockets."
                                + " If you have multiple servers check that sticky sessions are enabled.";
                        }
                        reject(new Error(error));
                    }
                };
            });
        }
        send(data) {
            if (this._webSocket && this._webSocket.readyState === this._webSocketConstructor.OPEN) {
                this._logger.log(LogLevel.Trace, `(WebSockets transport) sending data. ${getDataDetail(data, this._logMessageContent)}.`);
                this._webSocket.send(data);
                return Promise.resolve();
            }
            return Promise.reject("WebSocket is not in the OPEN state");
        }
        stop() {
            if (this._webSocket) {
                // Manually invoke onclose callback inline so we know the HttpConnection was closed properly before returning
                // This also solves an issue where websocket.onclose could take 18+ seconds to trigger during network disconnects
                this._close(undefined);
            }
            return Promise.resolve();
        }
        _close(event) {
            // webSocket will be null if the transport did not start successfully
            if (this._webSocket) {
                // Clear websocket handlers because we are considering the socket closed now
                this._webSocket.onclose = () => { };
                this._webSocket.onmessage = () => { };
                this._webSocket.onerror = () => { };
                this._webSocket.close();
                this._webSocket = undefined;
            }
            this._logger.log(LogLevel.Trace, "(WebSockets transport) socket closed.");
            if (this.onclose) {
                if (this._isCloseEvent(event) && (event.wasClean === false || event.code !== 1000)) {
                    this.onclose(new Error(`WebSocket closed with status code: ${event.code} (${event.reason || "no reason given"}).`));
                }
                else if (event instanceof Error) {
                    this.onclose(event);
                }
                else {
                    this.onclose();
                }
            }
        }
        _isCloseEvent(event) {
            return event && typeof event.wasClean === "boolean" && typeof event.code === "number";
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    const MAX_REDIRECTS = 100;
    /** @private */
    class HttpConnection {
        constructor(url, options = {}) {
            this._stopPromiseResolver = () => { };
            this.features = {};
            this._negotiateVersion = 1;
            Arg.isRequired(url, "url");
            this._logger = createLogger(options.logger);
            this.baseUrl = this._resolveUrl(url);
            options = options || {};
            options.logMessageContent = options.logMessageContent === undefined ? false : options.logMessageContent;
            if (typeof options.withCredentials === "boolean" || options.withCredentials === undefined) {
                options.withCredentials = options.withCredentials === undefined ? true : options.withCredentials;
            }
            else {
                throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
            }
            options.timeout = options.timeout === undefined ? 100 * 1000 : options.timeout;
            let webSocketModule = null;
            let eventSourceModule = null;
            if (Platform.isNode && typeof require !== "undefined") {
                // In order to ignore the dynamic require in webpack builds we need to do this magic
                // @ts-ignore: TS doesn't know about these names
                const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
                webSocketModule = requireFunc("ws");
                eventSourceModule = requireFunc("eventsource");
            }
            if (!Platform.isNode && typeof WebSocket !== "undefined" && !options.WebSocket) {
                options.WebSocket = WebSocket;
            }
            else if (Platform.isNode && !options.WebSocket) {
                if (webSocketModule) {
                    options.WebSocket = webSocketModule;
                }
            }
            if (!Platform.isNode && typeof EventSource !== "undefined" && !options.EventSource) {
                options.EventSource = EventSource;
            }
            else if (Platform.isNode && !options.EventSource) {
                if (typeof eventSourceModule !== "undefined") {
                    options.EventSource = eventSourceModule;
                }
            }
            this._httpClient = new AccessTokenHttpClient(options.httpClient || new DefaultHttpClient(this._logger), options.accessTokenFactory);
            this._connectionState = "Disconnected" /* ConnectionState.Disconnected */;
            this._connectionStarted = false;
            this._options = options;
            this.onreceive = null;
            this.onclose = null;
        }
        async start(transferFormat) {
            transferFormat = transferFormat || TransferFormat.Binary;
            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
            this._logger.log(LogLevel.Debug, `Starting connection with transfer format '${TransferFormat[transferFormat]}'.`);
            if (this._connectionState !== "Disconnected" /* ConnectionState.Disconnected */) {
                return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
            }
            this._connectionState = "Connecting" /* ConnectionState.Connecting */;
            this._startInternalPromise = this._startInternal(transferFormat);
            await this._startInternalPromise;
            // The TypeScript compiler thinks that connectionState must be Connecting here. The TypeScript compiler is wrong.
            if (this._connectionState === "Disconnecting" /* ConnectionState.Disconnecting */) {
                // stop() was called and transitioned the client into the Disconnecting state.
                const message = "Failed to start the HttpConnection before stop() was called.";
                this._logger.log(LogLevel.Error, message);
                // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
                await this._stopPromise;
                return Promise.reject(new AbortError(message));
            }
            else if (this._connectionState !== "Connected" /* ConnectionState.Connected */) {
                // stop() was called and transitioned the client into the Disconnecting state.
                const message = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
                this._logger.log(LogLevel.Error, message);
                return Promise.reject(new AbortError(message));
            }
            this._connectionStarted = true;
        }
        send(data) {
            if (this._connectionState !== "Connected" /* ConnectionState.Connected */) {
                return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."));
            }
            if (!this._sendQueue) {
                this._sendQueue = new TransportSendQueue(this.transport);
            }
            // Transport will not be null if state is connected
            return this._sendQueue.send(data);
        }
        async stop(error) {
            if (this._connectionState === "Disconnected" /* ConnectionState.Disconnected */) {
                this._logger.log(LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnected state.`);
                return Promise.resolve();
            }
            if (this._connectionState === "Disconnecting" /* ConnectionState.Disconnecting */) {
                this._logger.log(LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
                return this._stopPromise;
            }
            this._connectionState = "Disconnecting" /* ConnectionState.Disconnecting */;
            this._stopPromise = new Promise((resolve) => {
                // Don't complete stop() until stopConnection() completes.
                this._stopPromiseResolver = resolve;
            });
            // stopInternal should never throw so just observe it.
            await this._stopInternal(error);
            await this._stopPromise;
        }
        async _stopInternal(error) {
            // Set error as soon as possible otherwise there is a race between
            // the transport closing and providing an error and the error from a close message
            // We would prefer the close message error.
            this._stopError = error;
            try {
                await this._startInternalPromise;
            }
            catch (e) {
                // This exception is returned to the user as a rejected Promise from the start method.
            }
            // The transport's onclose will trigger stopConnection which will run our onclose event.
            // The transport should always be set if currently connected. If it wasn't set, it's likely because
            // stop was called during start() and start() failed.
            if (this.transport) {
                try {
                    await this.transport.stop();
                }
                catch (e) {
                    this._logger.log(LogLevel.Error, `HttpConnection.transport.stop() threw error '${e}'.`);
                    this._stopConnection();
                }
                this.transport = undefined;
            }
            else {
                this._logger.log(LogLevel.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
            }
        }
        async _startInternal(transferFormat) {
            // Store the original base url and the access token factory since they may change
            // as part of negotiating
            let url = this.baseUrl;
            this._accessTokenFactory = this._options.accessTokenFactory;
            this._httpClient._accessTokenFactory = this._accessTokenFactory;
            try {
                if (this._options.skipNegotiation) {
                    if (this._options.transport === HttpTransportType.WebSockets) {
                        // No need to add a connection ID in this case
                        this.transport = this._constructTransport(HttpTransportType.WebSockets);
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        await this._startTransport(url, transferFormat);
                    }
                    else {
                        throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
                    }
                }
                else {
                    let negotiateResponse = null;
                    let redirects = 0;
                    do {
                        negotiateResponse = await this._getNegotiationResponse(url);
                        // the user tries to stop the connection when it is being started
                        if (this._connectionState === "Disconnecting" /* ConnectionState.Disconnecting */ || this._connectionState === "Disconnected" /* ConnectionState.Disconnected */) {
                            throw new AbortError("The connection was stopped during negotiation.");
                        }
                        if (negotiateResponse.error) {
                            throw new Error(negotiateResponse.error);
                        }
                        if (negotiateResponse.ProtocolVersion) {
                            throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
                        }
                        if (negotiateResponse.url) {
                            url = negotiateResponse.url;
                        }
                        if (negotiateResponse.accessToken) {
                            // Replace the current access token factory with one that uses
                            // the returned access token
                            const accessToken = negotiateResponse.accessToken;
                            this._accessTokenFactory = () => accessToken;
                            // set the factory to undefined so the AccessTokenHttpClient won't retry with the same token, since we know it won't change until a connection restart
                            this._httpClient._accessToken = accessToken;
                            this._httpClient._accessTokenFactory = undefined;
                        }
                        redirects++;
                    } while (negotiateResponse.url && redirects < MAX_REDIRECTS);
                    if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
                        throw new Error("Negotiate redirection limit exceeded.");
                    }
                    await this._createTransport(url, this._options.transport, negotiateResponse, transferFormat);
                }
                if (this.transport instanceof LongPollingTransport) {
                    this.features.inherentKeepAlive = true;
                }
                if (this._connectionState === "Connecting" /* ConnectionState.Connecting */) {
                    // Ensure the connection transitions to the connected state prior to completing this.startInternalPromise.
                    // start() will handle the case when stop was called and startInternal exits still in the disconnecting state.
                    this._logger.log(LogLevel.Debug, "The HttpConnection connected successfully.");
                    this._connectionState = "Connected" /* ConnectionState.Connected */;
                }
                // stop() is waiting on us via this.startInternalPromise so keep this.transport around so it can clean up.
                // This is the only case startInternal can exit in neither the connected nor disconnected state because stopConnection()
                // will transition to the disconnected state. start() will wait for the transition using the stopPromise.
            }
            catch (e) {
                this._logger.log(LogLevel.Error, "Failed to start the connection: " + e);
                this._connectionState = "Disconnected" /* ConnectionState.Disconnected */;
                this.transport = undefined;
                // if start fails, any active calls to stop assume that start will complete the stop promise
                this._stopPromiseResolver();
                return Promise.reject(e);
            }
        }
        async _getNegotiationResponse(url) {
            const headers = {};
            const [name, value] = getUserAgentHeader();
            headers[name] = value;
            const negotiateUrl = this._resolveNegotiateUrl(url);
            this._logger.log(LogLevel.Debug, `Sending negotiation request: ${negotiateUrl}.`);
            try {
                const response = await this._httpClient.post(negotiateUrl, {
                    content: "",
                    headers: { ...headers, ...this._options.headers },
                    timeout: this._options.timeout,
                    withCredentials: this._options.withCredentials,
                });
                if (response.statusCode !== 200) {
                    return Promise.reject(new Error(`Unexpected status code returned from negotiate '${response.statusCode}'`));
                }
                const negotiateResponse = JSON.parse(response.content);
                if (!negotiateResponse.negotiateVersion || negotiateResponse.negotiateVersion < 1) {
                    // Negotiate version 0 doesn't use connectionToken
                    // So we set it equal to connectionId so all our logic can use connectionToken without being aware of the negotiate version
                    negotiateResponse.connectionToken = negotiateResponse.connectionId;
                }
                if (negotiateResponse.useStatefulReconnect && this._options._useStatefulReconnect !== true) {
                    return Promise.reject(new FailedToNegotiateWithServerError("Client didn't negotiate Stateful Reconnect but the server did."));
                }
                return negotiateResponse;
            }
            catch (e) {
                let errorMessage = "Failed to complete negotiation with the server: " + e;
                if (e instanceof HttpError) {
                    if (e.statusCode === 404) {
                        errorMessage = errorMessage + " Either this is not a SignalR endpoint or there is a proxy blocking the connection.";
                    }
                }
                this._logger.log(LogLevel.Error, errorMessage);
                return Promise.reject(new FailedToNegotiateWithServerError(errorMessage));
            }
        }
        _createConnectUrl(url, connectionToken) {
            if (!connectionToken) {
                return url;
            }
            return url + (url.indexOf("?") === -1 ? "?" : "&") + `id=${connectionToken}`;
        }
        async _createTransport(url, requestedTransport, negotiateResponse, requestedTransferFormat) {
            let connectUrl = this._createConnectUrl(url, negotiateResponse.connectionToken);
            if (this._isITransport(requestedTransport)) {
                this._logger.log(LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly.");
                this.transport = requestedTransport;
                await this._startTransport(connectUrl, requestedTransferFormat);
                this.connectionId = negotiateResponse.connectionId;
                return;
            }
            const transportExceptions = [];
            const transports = negotiateResponse.availableTransports || [];
            let negotiate = negotiateResponse;
            for (const endpoint of transports) {
                const transportOrError = this._resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat, (negotiate === null || negotiate === void 0 ? void 0 : negotiate.useStatefulReconnect) === true);
                if (transportOrError instanceof Error) {
                    // Store the error and continue, we don't want to cause a re-negotiate in these cases
                    transportExceptions.push(`${endpoint.transport} failed:`);
                    transportExceptions.push(transportOrError);
                }
                else if (this._isITransport(transportOrError)) {
                    this.transport = transportOrError;
                    if (!negotiate) {
                        try {
                            negotiate = await this._getNegotiationResponse(url);
                        }
                        catch (ex) {
                            return Promise.reject(ex);
                        }
                        connectUrl = this._createConnectUrl(url, negotiate.connectionToken);
                    }
                    try {
                        await this._startTransport(connectUrl, requestedTransferFormat);
                        this.connectionId = negotiate.connectionId;
                        return;
                    }
                    catch (ex) {
                        this._logger.log(LogLevel.Error, `Failed to start the transport '${endpoint.transport}': ${ex}`);
                        negotiate = undefined;
                        transportExceptions.push(new FailedToStartTransportError(`${endpoint.transport} failed: ${ex}`, HttpTransportType[endpoint.transport]));
                        if (this._connectionState !== "Connecting" /* ConnectionState.Connecting */) {
                            const message = "Failed to select transport before stop() was called.";
                            this._logger.log(LogLevel.Debug, message);
                            return Promise.reject(new AbortError(message));
                        }
                    }
                }
            }
            if (transportExceptions.length > 0) {
                return Promise.reject(new AggregateErrors(`Unable to connect to the server with any of the available transports. ${transportExceptions.join(" ")}`, transportExceptions));
            }
            return Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
        }
        _constructTransport(transport) {
            switch (transport) {
                case HttpTransportType.WebSockets:
                    if (!this._options.WebSocket) {
                        throw new Error("'WebSocket' is not supported in your environment.");
                    }
                    return new WebSocketTransport(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
                case HttpTransportType.ServerSentEvents:
                    if (!this._options.EventSource) {
                        throw new Error("'EventSource' is not supported in your environment.");
                    }
                    return new ServerSentEventsTransport(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
                case HttpTransportType.LongPolling:
                    return new LongPollingTransport(this._httpClient, this._logger, this._options);
                default:
                    throw new Error(`Unknown transport: ${transport}.`);
            }
        }
        _startTransport(url, transferFormat) {
            this.transport.onreceive = this.onreceive;
            if (this.features.reconnect) {
                this.transport.onclose = async (e) => {
                    let callStop = false;
                    if (this.features.reconnect) {
                        try {
                            this.features.disconnected();
                            await this.transport.connect(url, transferFormat);
                            await this.features.resend();
                        }
                        catch {
                            callStop = true;
                        }
                    }
                    else {
                        this._stopConnection(e);
                        return;
                    }
                    if (callStop) {
                        this._stopConnection(e);
                    }
                };
            }
            else {
                this.transport.onclose = (e) => this._stopConnection(e);
            }
            return this.transport.connect(url, transferFormat);
        }
        _resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat, useStatefulReconnect) {
            const transport = HttpTransportType[endpoint.transport];
            if (transport === null || transport === undefined) {
                this._logger.log(LogLevel.Debug, `Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
                return new Error(`Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
            }
            else {
                if (transportMatches(requestedTransport, transport)) {
                    const transferFormats = endpoint.transferFormats.map((s) => TransferFormat[s]);
                    if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
                        if ((transport === HttpTransportType.WebSockets && !this._options.WebSocket) ||
                            (transport === HttpTransportType.ServerSentEvents && !this._options.EventSource)) {
                            this._logger.log(LogLevel.Debug, `Skipping transport '${HttpTransportType[transport]}' because it is not supported in your environment.'`);
                            return new UnsupportedTransportError(`'${HttpTransportType[transport]}' is not supported in your environment.`, transport);
                        }
                        else {
                            this._logger.log(LogLevel.Debug, `Selecting transport '${HttpTransportType[transport]}'.`);
                            try {
                                this.features.reconnect = transport === HttpTransportType.WebSockets ? useStatefulReconnect : undefined;
                                return this._constructTransport(transport);
                            }
                            catch (ex) {
                                return ex;
                            }
                        }
                    }
                    else {
                        this._logger.log(LogLevel.Debug, `Skipping transport '${HttpTransportType[transport]}' because it does not support the requested transfer format '${TransferFormat[requestedTransferFormat]}'.`);
                        return new Error(`'${HttpTransportType[transport]}' does not support ${TransferFormat[requestedTransferFormat]}.`);
                    }
                }
                else {
                    this._logger.log(LogLevel.Debug, `Skipping transport '${HttpTransportType[transport]}' because it was disabled by the client.`);
                    return new DisabledTransportError(`'${HttpTransportType[transport]}' is disabled by the client.`, transport);
                }
            }
        }
        _isITransport(transport) {
            return transport && typeof (transport) === "object" && "connect" in transport;
        }
        _stopConnection(error) {
            this._logger.log(LogLevel.Debug, `HttpConnection.stopConnection(${error}) called while in state ${this._connectionState}.`);
            this.transport = undefined;
            // If we have a stopError, it takes precedence over the error from the transport
            error = this._stopError || error;
            this._stopError = undefined;
            if (this._connectionState === "Disconnected" /* ConnectionState.Disconnected */) {
                this._logger.log(LogLevel.Debug, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is already in the disconnected state.`);
                return;
            }
            if (this._connectionState === "Connecting" /* ConnectionState.Connecting */) {
                this._logger.log(LogLevel.Warning, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is still in the connecting state.`);
                throw new Error(`HttpConnection.stopConnection(${error}) was called while the connection is still in the connecting state.`);
            }
            if (this._connectionState === "Disconnecting" /* ConnectionState.Disconnecting */) {
                // A call to stop() induced this call to stopConnection and needs to be completed.
                // Any stop() awaiters will be scheduled to continue after the onclose callback fires.
                this._stopPromiseResolver();
            }
            if (error) {
                this._logger.log(LogLevel.Error, `Connection disconnected with error '${error}'.`);
            }
            else {
                this._logger.log(LogLevel.Information, "Connection disconnected.");
            }
            if (this._sendQueue) {
                this._sendQueue.stop().catch((e) => {
                    this._logger.log(LogLevel.Error, `TransportSendQueue.stop() threw error '${e}'.`);
                });
                this._sendQueue = undefined;
            }
            this.connectionId = undefined;
            this._connectionState = "Disconnected" /* ConnectionState.Disconnected */;
            if (this._connectionStarted) {
                this._connectionStarted = false;
                try {
                    if (this.onclose) {
                        this.onclose(error);
                    }
                }
                catch (e) {
                    this._logger.log(LogLevel.Error, `HttpConnection.onclose(${error}) threw error '${e}'.`);
                }
            }
        }
        _resolveUrl(url) {
            // startsWith is not supported in IE
            if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
                return url;
            }
            if (!Platform.isBrowser) {
                throw new Error(`Cannot resolve '${url}'.`);
            }
            // Setting the url to the href propery of an anchor tag handles normalization
            // for us. There are 3 main cases.
            // 1. Relative path normalization e.g "b" -> "http://localhost:5000/a/b"
            // 2. Absolute path normalization e.g "/a/b" -> "http://localhost:5000/a/b"
            // 3. Networkpath reference normalization e.g "//localhost:5000/a/b" -> "http://localhost:5000/a/b"
            const aTag = window.document.createElement("a");
            aTag.href = url;
            this._logger.log(LogLevel.Information, `Normalizing '${url}' to '${aTag.href}'.`);
            return aTag.href;
        }
        _resolveNegotiateUrl(url) {
            const negotiateUrl = new URL(url);
            if (negotiateUrl.pathname.endsWith('/')) {
                negotiateUrl.pathname += "negotiate";
            }
            else {
                negotiateUrl.pathname += "/negotiate";
            }
            const searchParams = new URLSearchParams(negotiateUrl.searchParams);
            if (!searchParams.has("negotiateVersion")) {
                searchParams.append("negotiateVersion", this._negotiateVersion.toString());
            }
            if (searchParams.has("useStatefulReconnect")) {
                if (searchParams.get("useStatefulReconnect") === "true") {
                    this._options._useStatefulReconnect = true;
                }
            }
            else if (this._options._useStatefulReconnect === true) {
                searchParams.append("useStatefulReconnect", "true");
            }
            negotiateUrl.search = searchParams.toString();
            return negotiateUrl.toString();
        }
    }
    function transportMatches(requestedTransport, actualTransport) {
        return !requestedTransport || ((actualTransport & requestedTransport) !== 0);
    }
    /** @private */
    class TransportSendQueue {
        constructor(_transport) {
            this._transport = _transport;
            this._buffer = [];
            this._executing = true;
            this._sendBufferedData = new PromiseSource();
            this._transportResult = new PromiseSource();
            this._sendLoopPromise = this._sendLoop();
        }
        send(data) {
            this._bufferData(data);
            if (!this._transportResult) {
                this._transportResult = new PromiseSource();
            }
            return this._transportResult.promise;
        }
        stop() {
            this._executing = false;
            this._sendBufferedData.resolve();
            return this._sendLoopPromise;
        }
        _bufferData(data) {
            if (this._buffer.length && typeof (this._buffer[0]) !== typeof (data)) {
                throw new Error(`Expected data to be of type ${typeof (this._buffer)} but was of type ${typeof (data)}`);
            }
            this._buffer.push(data);
            this._sendBufferedData.resolve();
        }
        async _sendLoop() {
            while (true) {
                await this._sendBufferedData.promise;
                if (!this._executing) {
                    if (this._transportResult) {
                        this._transportResult.reject("Connection stopped.");
                    }
                    break;
                }
                this._sendBufferedData = new PromiseSource();
                const transportResult = this._transportResult;
                this._transportResult = undefined;
                const data = typeof (this._buffer[0]) === "string" ?
                    this._buffer.join("") :
                    TransportSendQueue._concatBuffers(this._buffer);
                this._buffer.length = 0;
                try {
                    await this._transport.send(data);
                    transportResult.resolve();
                }
                catch (error) {
                    transportResult.reject(error);
                }
            }
        }
        static _concatBuffers(arrayBuffers) {
            const totalLength = arrayBuffers.map((b) => b.byteLength).reduce((a, b) => a + b);
            const result = new Uint8Array(totalLength);
            let offset = 0;
            for (const item of arrayBuffers) {
                result.set(new Uint8Array(item), offset);
                offset += item.byteLength;
            }
            return result.buffer;
        }
    }
    class PromiseSource {
        constructor() {
            this.promise = new Promise((resolve, reject) => [this._resolver, this._rejecter] = [resolve, reject]);
        }
        resolve() {
            this._resolver();
        }
        reject(reason) {
            this._rejecter(reason);
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    const JSON_HUB_PROTOCOL_NAME = "json";
    /** Implements the JSON Hub Protocol. */
    class JsonHubProtocol {
        constructor() {
            /** @inheritDoc */
            this.name = JSON_HUB_PROTOCOL_NAME;
            /** @inheritDoc */
            this.version = 2;
            /** @inheritDoc */
            this.transferFormat = TransferFormat.Text;
        }
        /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
         *
         * @param {string} input A string containing the serialized representation.
         * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
         */
        parseMessages(input, logger) {
            // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
            if (typeof input !== "string") {
                throw new Error("Invalid input for JSON hub protocol. Expected a string.");
            }
            if (!input) {
                return [];
            }
            if (logger === null) {
                logger = NullLogger.instance;
            }
            // Parse the messages
            const messages = TextMessageFormat.parse(input);
            const hubMessages = [];
            for (const message of messages) {
                const parsedMessage = JSON.parse(message);
                if (typeof parsedMessage.type !== "number") {
                    throw new Error("Invalid payload.");
                }
                switch (parsedMessage.type) {
                    case MessageType.Invocation:
                        this._isInvocationMessage(parsedMessage);
                        break;
                    case MessageType.StreamItem:
                        this._isStreamItemMessage(parsedMessage);
                        break;
                    case MessageType.Completion:
                        this._isCompletionMessage(parsedMessage);
                        break;
                    case MessageType.Ping:
                        // Single value, no need to validate
                        break;
                    case MessageType.Close:
                        // All optional values, no need to validate
                        break;
                    case MessageType.Ack:
                        this._isAckMessage(parsedMessage);
                        break;
                    case MessageType.Sequence:
                        this._isSequenceMessage(parsedMessage);
                        break;
                    default:
                        // Future protocol changes can add message types, old clients can ignore them
                        logger.log(LogLevel.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
                        continue;
                }
                hubMessages.push(parsedMessage);
            }
            return hubMessages;
        }
        /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
         *
         * @param {HubMessage} message The message to write.
         * @returns {string} A string containing the serialized representation of the message.
         */
        writeMessage(message) {
            return TextMessageFormat.write(JSON.stringify(message));
        }
        _isInvocationMessage(message) {
            this._assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
            if (message.invocationId !== undefined) {
                this._assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
            }
        }
        _isStreamItemMessage(message) {
            this._assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
            if (message.item === undefined) {
                throw new Error("Invalid payload for StreamItem message.");
            }
        }
        _isCompletionMessage(message) {
            if (message.result && message.error) {
                throw new Error("Invalid payload for Completion message.");
            }
            if (!message.result && message.error) {
                this._assertNotEmptyString(message.error, "Invalid payload for Completion message.");
            }
            this._assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
        }
        _isAckMessage(message) {
            if (typeof message.sequenceId !== 'number') {
                throw new Error("Invalid SequenceId for Ack message.");
            }
        }
        _isSequenceMessage(message) {
            if (typeof message.sequenceId !== 'number') {
                throw new Error("Invalid SequenceId for Sequence message.");
            }
        }
        _assertNotEmptyString(value, errorMessage) {
            if (typeof value !== "string" || value === "") {
                throw new Error(errorMessage);
            }
        }
    }

    // Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    const LogLevelNameMapping = {
        trace: LogLevel.Trace,
        debug: LogLevel.Debug,
        info: LogLevel.Information,
        information: LogLevel.Information,
        warn: LogLevel.Warning,
        warning: LogLevel.Warning,
        error: LogLevel.Error,
        critical: LogLevel.Critical,
        none: LogLevel.None,
    };
    function parseLogLevel(name) {
        // Case-insensitive matching via lower-casing
        // Yes, I know case-folding is a complicated problem in Unicode, but we only support
        // the ASCII strings defined in LogLevelNameMapping anyway, so it's fine -anurse.
        const mapping = LogLevelNameMapping[name.toLowerCase()];
        if (typeof mapping !== "undefined") {
            return mapping;
        }
        else {
            throw new Error(`Unknown log level: ${name}`);
        }
    }
    /** A builder for configuring {@link @microsoft/signalr.HubConnection} instances. */
    class HubConnectionBuilder {
        configureLogging(logging) {
            Arg.isRequired(logging, "logging");
            if (isLogger(logging)) {
                this.logger = logging;
            }
            else if (typeof logging === "string") {
                const logLevel = parseLogLevel(logging);
                this.logger = new ConsoleLogger(logLevel);
            }
            else {
                this.logger = new ConsoleLogger(logging);
            }
            return this;
        }
        withUrl(url, transportTypeOrOptions) {
            Arg.isRequired(url, "url");
            Arg.isNotEmpty(url, "url");
            this.url = url;
            // Flow-typing knows where it's at. Since HttpTransportType is a number and IHttpConnectionOptions is guaranteed
            // to be an object, we know (as does TypeScript) this comparison is all we need to figure out which overload was called.
            if (typeof transportTypeOrOptions === "object") {
                this.httpConnectionOptions = { ...this.httpConnectionOptions, ...transportTypeOrOptions };
            }
            else {
                this.httpConnectionOptions = {
                    ...this.httpConnectionOptions,
                    transport: transportTypeOrOptions,
                };
            }
            return this;
        }
        /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
         *
         * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
         */
        withHubProtocol(protocol) {
            Arg.isRequired(protocol, "protocol");
            this.protocol = protocol;
            return this;
        }
        withAutomaticReconnect(retryDelaysOrReconnectPolicy) {
            if (this.reconnectPolicy) {
                throw new Error("A reconnectPolicy has already been set.");
            }
            if (!retryDelaysOrReconnectPolicy) {
                this.reconnectPolicy = new DefaultReconnectPolicy();
            }
            else if (Array.isArray(retryDelaysOrReconnectPolicy)) {
                this.reconnectPolicy = new DefaultReconnectPolicy(retryDelaysOrReconnectPolicy);
            }
            else {
                this.reconnectPolicy = retryDelaysOrReconnectPolicy;
            }
            return this;
        }
        /** Configures {@link @microsoft/signalr.HubConnection.serverTimeoutInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
         *
         * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
         */
        withServerTimeout(milliseconds) {
            Arg.isRequired(milliseconds, "milliseconds");
            this._serverTimeoutInMilliseconds = milliseconds;
            return this;
        }
        /** Configures {@link @microsoft/signalr.HubConnection.keepAliveIntervalInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
         *
         * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
         */
        withKeepAliveInterval(milliseconds) {
            Arg.isRequired(milliseconds, "milliseconds");
            this._keepAliveIntervalInMilliseconds = milliseconds;
            return this;
        }
        /** Enables and configures options for the Stateful Reconnect feature.
         *
         * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
         */
        withStatefulReconnect(options) {
            if (this.httpConnectionOptions === undefined) {
                this.httpConnectionOptions = {};
            }
            this.httpConnectionOptions._useStatefulReconnect = true;
            this._statefulReconnectBufferSize = options === null || options === void 0 ? void 0 : options.bufferSize;
            return this;
        }
        /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
         *
         * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
         */
        build() {
            // If httpConnectionOptions has a logger, use it. Otherwise, override it with the one
            // provided to configureLogger
            const httpConnectionOptions = this.httpConnectionOptions || {};
            // If it's 'null', the user **explicitly** asked for null, don't mess with it.
            if (httpConnectionOptions.logger === undefined) {
                // If our logger is undefined or null, that's OK, the HttpConnection constructor will handle it.
                httpConnectionOptions.logger = this.logger;
            }
            // Now create the connection
            if (!this.url) {
                throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
            }
            const connection = new HttpConnection(this.url, httpConnectionOptions);
            return HubConnection.create(connection, this.logger || NullLogger.instance, this.protocol || new JsonHubProtocol(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds, this._statefulReconnectBufferSize);
        }
    }
    function isLogger(logger) {
        return logger.log !== undefined;
    }

    /**
     * Manages SignalR connection to the Minimact server hub
     */
    class SignalRManager {
        constructor(hubUrl = '/minimact', options = {}) {
            this.reconnectInterval = options.reconnectInterval || 5000;
            this.debugLogging = options.debugLogging || false;
            this.eventHandlers = new Map();
            this.connection = new HubConnectionBuilder()
                .withUrl(hubUrl)
                .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: () => this.reconnectInterval
            })
                .configureLogging(this.debugLogging ? LogLevel.Debug : LogLevel.Warning)
                .build();
            this.setupEventHandlers();
        }
        /**
         * Setup SignalR event handlers
         */
        setupEventHandlers() {
            // Handle component updates from server
            this.connection.on('UpdateComponent', (componentId, html) => {
                this.log('UpdateComponent', { componentId, html });
                this.emit('updateComponent', { componentId, html });
            });
            // Handle patch updates from server
            this.connection.on('ApplyPatches', (componentId, patches) => {
                this.log('ApplyPatches', { componentId, patches });
                this.emit('applyPatches', { componentId, patches });
            });
            // Handle predicted patches (sent immediately for instant feedback)
            this.connection.on('ApplyPrediction', (data) => {
                this.log(`ApplyPrediction (${(data.confidence * 100).toFixed(0)}% confident)`, { componentId: data.componentId, patches: data.patches });
                this.emit('applyPrediction', { componentId: data.componentId, patches: data.patches, confidence: data.confidence });
            });
            // Handle correction if prediction was wrong
            this.connection.on('ApplyCorrection', (data) => {
                this.log('ApplyCorrection (prediction was incorrect)', { componentId: data.componentId, patches: data.patches });
                this.emit('applyCorrection', { componentId: data.componentId, patches: data.patches });
            });
            // Handle hint queueing (usePredictHint)
            this.connection.on('QueueHint', (data) => {
                this.log(`QueueHint '${data.hintId}' (${(data.confidence * 100).toFixed(0)}% confident)`, {
                    componentId: data.componentId,
                    patches: data.patches
                });
                this.emit('queueHint', data);
            });
            // Handle errors from server
            this.connection.on('Error', (message) => {
                console.error('[Minimact] Server error:', message);
                this.emit('error', { message });
            });
            // Handle reconnection
            this.connection.onreconnecting((error) => {
                this.log('Reconnecting...', error);
                this.emit('reconnecting', { error });
            });
            this.connection.onreconnected((connectionId) => {
                this.log('Reconnected', { connectionId });
                this.emit('reconnected', { connectionId });
            });
            this.connection.onclose((error) => {
                this.log('Connection closed', error);
                this.emit('closed', { error });
            });
        }
        /**
         * Start the SignalR connection
         */
        async start() {
            try {
                await this.connection.start();
                this.log('Connected to Minimact hub');
                this.emit('connected', { connectionId: this.connection.connectionId });
            }
            catch (error) {
                console.error('[Minimact] Failed to connect:', error);
                throw error;
            }
        }
        /**
         * Stop the SignalR connection
         */
        async stop() {
            await this.connection.stop();
            this.log('Disconnected from Minimact hub');
        }
        /**
         * Register a component with the server
         */
        async registerComponent(componentId) {
            try {
                await this.connection.invoke('RegisterComponent', componentId);
                this.log('Registered component', { componentId });
            }
            catch (error) {
                console.error('[Minimact] Failed to register component:', error);
                throw error;
            }
        }
        /**
         * Invoke a component method on the server
         */
        async invokeComponentMethod(componentId, methodName, args = {}) {
            try {
                const argsJson = JSON.stringify(args);
                await this.connection.invoke('InvokeComponentMethod', componentId, methodName, argsJson);
                this.log('Invoked method', { componentId, methodName, args });
            }
            catch (error) {
                console.error('[Minimact] Failed to invoke method:', error);
                throw error;
            }
        }
        /**
         * Update client state on the server (single key-value)
         */
        async updateClientState(componentId, key, value) {
            try {
                const valueJson = JSON.stringify(value);
                await this.connection.invoke('UpdateClientState', componentId, key, valueJson);
                this.log('Updated client state', { componentId, key, value });
            }
            catch (error) {
                console.error('[Minimact] Failed to update client state:', error);
            }
        }
        /**
         * Update multiple client-computed state values on the server
         * Used for external library computations (lodash, moment, etc.)
         */
        async updateClientComputedState(componentId, computedValues) {
            try {
                await this.connection.invoke('UpdateClientComputedState', componentId, computedValues);
                this.log('Updated client-computed state', { componentId, computedValues });
            }
            catch (error) {
                console.error('[Minimact] Failed to update client-computed state:', error);
                throw error;
            }
        }
        /**
         * Update component state on the server (from useState hook)
         * This keeps server state in sync with client state changes
         */
        async updateComponentState(componentId, stateKey, value) {
            try {
                await this.connection.invoke('UpdateComponentState', componentId, stateKey, value);
                this.log('Updated component state', { componentId, stateKey, value });
            }
            catch (error) {
                console.error('[Minimact] Failed to update component state:', error);
                throw error;
            }
        }
        /**
         * Update DOM element state on the server (from useDomElementState hook)
         * This keeps server aware of DOM changes for accurate rendering
         */
        async updateDomElementState(componentId, stateKey, snapshot) {
            try {
                await this.connection.invoke('UpdateDomElementState', componentId, stateKey, snapshot);
                this.log('Updated DOM element state', { componentId, stateKey, snapshot });
            }
            catch (error) {
                console.error('[Minimact] Failed to update DOM element state:', error);
                throw error;
            }
        }
        /**
         * Update component state with array operation metadata
         * This provides semantic intent for array mutations, enabling precise template extraction
         */
        async updateComponentStateWithOperation(componentId, stateKey, newValue, operation) {
            try {
                await this.connection.invoke('UpdateComponentStateWithOperation', componentId, stateKey, newValue, operation);
                this.log('Updated component state with operation', { componentId, stateKey, operation, newValue });
            }
            catch (error) {
                console.error('[Minimact] Failed to update component state with operation:', error);
                throw error;
            }
        }
        /**
         * Update query results on the server (from useDomQuery hook)
         * This keeps server aware of query results for accurate rendering
         */
        async updateQueryResults(componentId, queryKey, results) {
            try {
                await this.connection.invoke('UpdateQueryResults', componentId, queryKey, results);
                this.log('Updated query results', { componentId, queryKey, resultCount: results.length });
            }
            catch (error) {
                console.error('[Minimact] Failed to update query results:', error);
                throw error;
            }
        }
        /**
         * Generic invoke method for calling server hub methods
         */
        async invoke(methodName, ...args) {
            try {
                await this.connection.invoke(methodName, ...args);
                this.log(`Invoked ${methodName}`, { args });
            }
            catch (error) {
                console.error(`[Minimact] Failed to invoke ${methodName}:`, error);
                throw error;
            }
        }
        /**
         * Subscribe to events
         */
        on(event, handler) {
            if (!this.eventHandlers.has(event)) {
                this.eventHandlers.set(event, new Set());
            }
            this.eventHandlers.get(event).add(handler);
        }
        /**
         * Unsubscribe from events
         */
        off(event, handler) {
            const handlers = this.eventHandlers.get(event);
            if (handlers) {
                handlers.delete(handler);
            }
        }
        /**
         * Emit event to subscribers
         */
        emit(event, data) {
            const handlers = this.eventHandlers.get(event);
            if (handlers) {
                handlers.forEach(handler => handler(data));
            }
        }
        /**
         * Debug logging
         */
        log(message, data) {
            if (this.debugLogging) {
                console.log(`[Minimact SignalR] ${message}`, data || '');
            }
        }
        /**
         * Get connection state
         */
        get state() {
            return this.connection.state;
        }
        /**
         * Get connection ID
         */
        get connectionId() {
            return this.connection.connectionId;
        }
    }

    /**
     * Applies DOM patches from the server to the actual DOM
     * Handles surgical updates for minimal DOM manipulation
     */
    class DOMPatcher {
        constructor(options = {}) {
            this.debugLogging = options.debugLogging || false;
        }
        /**
         * Apply an array of patches to a root element
         */
        applyPatches(rootElement, patches) {
            this.log('Applying patches', { count: patches.length, patches });
            for (const patch of patches) {
                try {
                    this.applyPatch(rootElement, patch);
                }
                catch (error) {
                    console.error('[Minimact] Failed to apply patch:', patch, error);
                }
            }
        }
        /**
         * Apply a single patch to the DOM
         */
        applyPatch(rootElement, patch) {
            const targetElement = this.getElementByPath(rootElement, patch.path);
            if (!targetElement && patch.type !== 'Create') {
                console.warn('[Minimact] Target element not found for patch:', patch);
                return;
            }
            switch (patch.type) {
                case 'Create':
                    this.patchCreate(rootElement, patch.path, patch.node);
                    break;
                case 'Remove':
                    this.patchRemove(targetElement);
                    break;
                case 'Replace':
                    this.patchReplace(targetElement, patch.node);
                    break;
                case 'UpdateText':
                    this.patchUpdateText(targetElement, patch.content);
                    break;
                case 'UpdateProps':
                    this.patchUpdateProps(targetElement, patch.props);
                    break;
                case 'ReorderChildren':
                    this.patchReorderChildren(targetElement, patch.order);
                    break;
            }
        }
        /**
         * Create and insert a new node
         */
        patchCreate(rootElement, path, node) {
            const newElement = this.createElementFromVNode(node);
            if (path.length === 0) {
                // Replace root
                rootElement.innerHTML = '';
                rootElement.appendChild(newElement);
            }
            else {
                // Insert at path
                const parentPath = path.slice(0, -1);
                const index = path[path.length - 1];
                const parent = this.getElementByPath(rootElement, parentPath);
                if (parent) {
                    if (index >= parent.childNodes.length) {
                        parent.appendChild(newElement);
                    }
                    else {
                        parent.insertBefore(newElement, parent.childNodes[index]);
                    }
                }
            }
            this.log('Created node', { path, node });
        }
        /**
         * Remove a node from the DOM
         */
        patchRemove(element) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
                this.log('Removed node', { element });
            }
        }
        /**
         * Replace a node with a new one
         */
        patchReplace(oldElement, newNode) {
            const newElement = this.createElementFromVNode(newNode);
            if (oldElement.parentNode) {
                oldElement.parentNode.replaceChild(newElement, oldElement);
                this.log('Replaced node', { oldElement, newNode });
            }
        }
        /**
         * Update text content of a text node
         */
        patchUpdateText(element, content) {
            if (element.nodeType === Node.TEXT_NODE) {
                element.textContent = content;
            }
            else {
                // If it's an element, update its text content
                element.textContent = content;
            }
            this.log('Updated text', { element, content });
        }
        /**
         * Update element properties/attributes
         */
        patchUpdateProps(element, props) {
            // Remove old attributes not in new props
            const oldAttrs = Array.from(element.attributes);
            for (const attr of oldAttrs) {
                if (!(attr.name in props) && !attr.name.startsWith('data-minimact-')) {
                    element.removeAttribute(attr.name);
                }
            }
            // Set new attributes
            for (const [key, value] of Object.entries(props)) {
                if (key === 'style') {
                    element.setAttribute('style', value);
                }
                else if (key === 'class' || key === 'className') {
                    element.className = value;
                }
                else if (key.startsWith('on')) {
                    // Event handlers are managed separately
                    continue;
                }
                else {
                    element.setAttribute(key, value);
                }
            }
            this.log('Updated props', { element, props });
        }
        /**
         * Reorder children based on keys
         */
        patchReorderChildren(element, order) {
            const keyedChildren = new Map();
            // Build map of keyed children
            for (const child of Array.from(element.childNodes)) {
                if (child instanceof HTMLElement) {
                    const key = child.getAttribute('data-key') || child.getAttribute('key');
                    if (key) {
                        keyedChildren.set(key, child);
                    }
                }
            }
            // Reorder based on order array
            for (let i = 0; i < order.length; i++) {
                const key = order[i];
                const child = keyedChildren.get(key);
                if (child) {
                    const currentChild = element.childNodes[i];
                    if (currentChild !== child) {
                        element.insertBefore(child, currentChild);
                    }
                }
            }
            this.log('Reordered children', { element, order });
        }
        /**
         * Get a DOM element by its path (array of indices)
         */
        getElementByPath(rootElement, path) {
            let current = rootElement;
            for (const index of path) {
                if (index >= current.childNodes.length) {
                    return null;
                }
                current = current.childNodes[index];
            }
            return current;
        }
        /**
         * Create a DOM element from a VNode
         */
        createElementFromVNode(vnode) {
            switch (vnode.type) {
                case 'Text':
                    return document.createTextNode(vnode.content);
                case 'Element': {
                    const velem = vnode;
                    const element = document.createElement(velem.tag);
                    // Set attributes
                    for (const [key, value] of Object.entries(velem.props || {})) {
                        if (key === 'className' || key === 'class') {
                            element.className = value;
                        }
                        else if (key.startsWith('on')) {
                            // Event handlers will be attached by event delegation
                            element.setAttribute(`data-${key.toLowerCase()}`, value);
                        }
                        else {
                            element.setAttribute(key, value);
                        }
                    }
                    // Set key if present
                    if (velem.key) {
                        element.setAttribute('data-key', velem.key);
                    }
                    // Create children
                    for (const child of velem.children || []) {
                        element.appendChild(this.createElementFromVNode(child));
                    }
                    return element;
                }
                case 'Fragment': {
                    const fragment = document.createDocumentFragment();
                    const vfrag = vnode;
                    for (const child of vfrag.children || []) {
                        fragment.appendChild(this.createElementFromVNode(child));
                    }
                    return fragment;
                }
                case 'RawHtml': {
                    const div = document.createElement('div');
                    div.innerHTML = vnode.html;
                    return div;
                }
                default:
                    console.warn('[Minimact] Unknown VNode type:', vnode);
                    return document.createTextNode('');
            }
        }
        /**
         * Replace entire HTML (fallback when patches aren't available)
         */
        replaceHTML(rootElement, html) {
            rootElement.innerHTML = html;
            this.log('Replaced entire HTML', { html });
        }
        /**
         * Debug logging
         */
        log(message, data) {
            if (this.debugLogging) {
                console.log(`[Minimact DOMPatcher] ${message}`, data || '');
            }
        }
    }

    /**
     * Manages client-side state (useClientState) with reactive updates
     * Handles local state that doesn't require server round-trips
     */
    class ClientStateManager {
        constructor(options = {}) {
            this.states = new Map();
            this.subscribers = new Map();
            this.debugLogging = options.debugLogging || false;
        }
        /**
         * Initialize client state for a component
         */
        initializeComponent(componentId, initialState = {}) {
            this.states.set(componentId, { ...initialState });
            this.subscribers.set(componentId, new Map());
            this.log('Initialized component state', { componentId, initialState });
        }
        /**
         * Get client state value
         */
        getState(componentId, key) {
            const componentState = this.states.get(componentId);
            return componentState ? componentState[key] : undefined;
        }
        /**
         * Set client state value and trigger updates
         */
        setState(componentId, key, value) {
            const componentState = this.states.get(componentId);
            if (!componentState) {
                console.warn(`[Minimact] Component ${componentId} not initialized`);
                return;
            }
            // Update state
            const oldValue = componentState[key];
            componentState[key] = value;
            this.log('State updated', { componentId, key, oldValue, newValue: value });
            // Notify subscribers
            this.notifySubscribers(componentId, key, value, oldValue);
        }
        /**
         * Subscribe to state changes
         */
        subscribe(componentId, key, callback) {
            const componentSubscribers = this.subscribers.get(componentId);
            if (!componentSubscribers) {
                console.warn(`[Minimact] Component ${componentId} not initialized`);
                return () => { };
            }
            if (!componentSubscribers.has(key)) {
                componentSubscribers.set(key, new Set());
            }
            componentSubscribers.get(key).add(callback);
            this.log('Subscribed to state', { componentId, key });
            // Return unsubscribe function
            return () => {
                componentSubscribers.get(key)?.delete(callback);
                this.log('Unsubscribed from state', { componentId, key });
            };
        }
        /**
         * Notify all subscribers of a state change
         */
        notifySubscribers(componentId, key, value, oldValue) {
            const componentSubscribers = this.subscribers.get(componentId);
            if (!componentSubscribers) {
                return;
            }
            const keySubscribers = componentSubscribers.get(key);
            if (keySubscribers) {
                keySubscribers.forEach(callback => {
                    try {
                        callback(value, oldValue);
                    }
                    catch (error) {
                        console.error('[Minimact] Error in state subscriber:', error);
                    }
                });
            }
        }
        /**
         * Get all state for a component
         */
        getComponentState(componentId) {
            return this.states.get(componentId);
        }
        /**
         * Update multiple state values at once
         */
        updateState(componentId, updates) {
            for (const [key, value] of Object.entries(updates)) {
                this.setState(componentId, key, value);
            }
        }
        /**
         * Clear state for a component
         */
        clearComponent(componentId) {
            this.states.delete(componentId);
            this.subscribers.delete(componentId);
            this.log('Cleared component state', { componentId });
        }
        /**
         * Bind state to a DOM element's value/content
         */
        bindToElement(componentId, key, element, property = 'textContent') {
            // Set initial value
            const initialValue = this.getState(componentId, key);
            if (initialValue !== undefined) {
                this.updateElement(element, property, initialValue);
            }
            // Subscribe to changes
            return this.subscribe(componentId, key, (value) => {
                this.updateElement(element, property, value);
            });
        }
        /**
         * Update a DOM element based on property type
         */
        updateElement(element, property, value) {
            switch (property) {
                case 'value':
                    if (element instanceof HTMLInputElement ||
                        element instanceof HTMLTextAreaElement ||
                        element instanceof HTMLSelectElement) {
                        element.value = String(value);
                    }
                    break;
                case 'textContent':
                    element.textContent = String(value);
                    break;
                case 'innerHTML':
                    element.innerHTML = String(value);
                    break;
            }
        }
        /**
         * Bind input element to state (two-way binding)
         */
        bindInput(componentId, key, input) {
            // Set initial value
            const initialValue = this.getState(componentId, key);
            if (initialValue !== undefined) {
                input.value = String(initialValue);
            }
            // Listen to input changes
            const inputHandler = (e) => {
                const target = e.target;
                this.setState(componentId, key, target.value);
            };
            input.addEventListener('input', inputHandler);
            // Subscribe to state changes from other sources
            const unsubscribe = this.subscribe(componentId, key, (value) => {
                if (input.value !== String(value)) {
                    input.value = String(value);
                }
            });
            // Return cleanup function
            return () => {
                input.removeEventListener('input', inputHandler);
                unsubscribe();
            };
        }
        /**
         * Debug logging
         */
        log(message, data) {
            if (this.debugLogging) {
                console.log(`[Minimact ClientState] ${message}`, data || '');
            }
        }
    }

    /**
     * Event delegation system for handling component events
     * Uses a single root listener for performance
     */
    class EventDelegation {
        constructor(rootElement, componentMethodInvoker, options = {}) {
            this.rootElement = rootElement;
            this.componentMethodInvoker = componentMethodInvoker;
            this.debugLogging = options.debugLogging || false;
            this.hintQueue = options.hintQueue;
            this.domPatcher = options.domPatcher;
            this.playgroundBridge = options.playgroundBridge;
            this.eventListeners = new Map();
            this.setupEventDelegation();
        }
        /**
         * Setup event delegation for common events
         */
        setupEventDelegation() {
            const eventTypes = [
                'click',
                'dblclick',
                'input',
                'change',
                'submit',
                'focus',
                'blur',
                'keydown',
                'keyup',
                'keypress',
                'mouseenter',
                'mouseleave',
                'mouseover',
                'mouseout'
            ];
            for (const eventType of eventTypes) {
                const listener = this.createEventListener(eventType);
                this.eventListeners.set(eventType, listener);
                this.rootElement.addEventListener(eventType, listener, true); // Use capture phase
            }
            this.log('Event delegation setup complete', { eventTypes });
        }
        /**
         * Create an event listener for a specific event type
         */
        createEventListener(eventType) {
            return async (event) => {
                const target = event.target;
                // Find the nearest element with an event handler
                const handlerElement = this.findHandlerElement(target, eventType);
                if (!handlerElement) {
                    return;
                }
                // Get handler information
                const handler = this.getEventHandler(handlerElement, eventType);
                if (!handler) {
                    return;
                }
                // Prevent default for submit events
                if (eventType === 'submit') {
                    event.preventDefault();
                }
                this.log('Event triggered', { eventType, handler, target });
                // Execute handler
                await this.executeHandler(handler, event, handlerElement);
            };
        }
        /**
         * Find the nearest element with an event handler attribute
         */
        findHandlerElement(element, eventType) {
            let current = element;
            while (current && current !== this.rootElement) {
                const attrName = `data-on${eventType}`;
                const legacyAttrName = `on${eventType}`;
                if (current.hasAttribute(attrName) || current.hasAttribute(legacyAttrName)) {
                    return current;
                }
                current = current.parentElement;
            }
            return null;
        }
        /**
         * Get event handler information from element
         */
        getEventHandler(element, eventType) {
            const attrName = `data-on${eventType}`;
            const legacyAttrName = `on${eventType}`;
            const handlerStr = element.getAttribute(attrName) || element.getAttribute(legacyAttrName);
            if (!handlerStr) {
                return null;
            }
            // Parse handler string
            // Format: "MethodName" or "MethodName:arg1:arg2"
            const parts = handlerStr.split(':');
            const methodName = parts[0];
            const args = parts.slice(1);
            // Find component ID
            const componentId = this.findComponentId(element);
            if (!componentId) {
                console.warn('[Minimact] No component ID found for event handler:', handlerStr);
                return null;
            }
            return {
                componentId,
                methodName,
                args
            };
        }
        /**
         * Find the component ID for an element
         */
        findComponentId(element) {
            let current = element;
            while (current && current !== this.rootElement) {
                const componentId = current.getAttribute('data-minimact-component-id');
                if (componentId) {
                    return componentId;
                }
                current = current.parentElement;
            }
            // Check root element
            const rootComponentId = this.rootElement.getAttribute('data-minimact-component-id');
            return rootComponentId;
        }
        /**
         * Execute an event handler
         */
        async executeHandler(handler, event, element) {
            const startTime = performance.now();
            try {
                // Build args object
                const argsObj = {};
                // Add parsed args from handler string
                if (handler.args.length > 0) {
                    argsObj.args = handler.args;
                }
                // Add event data
                if (event instanceof MouseEvent) {
                    argsObj.mouse = {
                        clientX: event.clientX,
                        clientY: event.clientY,
                        button: event.button
                    };
                }
                if (event instanceof KeyboardEvent) {
                    argsObj.keyboard = {
                        key: event.key,
                        code: event.code,
                        ctrlKey: event.ctrlKey,
                        shiftKey: event.shiftKey,
                        altKey: event.altKey
                    };
                }
                // Add target value for input events
                if (event.type === 'input' || event.type === 'change') {
                    const target = event.target;
                    argsObj.value = target.value;
                }
                // Convert argsObj to array format expected by server
                // Server expects: object[] args, so we pass the actual argument values as an array
                const argsArray = [];
                // For input/change events, pass the value as the first argument
                if (argsObj.value !== undefined) {
                    argsArray.push(argsObj.value);
                }
                // For handlers with explicit args, add those
                if (argsObj.args && Array.isArray(argsObj.args)) {
                    argsArray.push(...argsObj.args);
                }
                // Check hint queue for cached prediction (CACHE HIT!)
                if (this.hintQueue && this.domPatcher) {
                    // Try to match hint based on the method being called
                    // This is a simplified version - in reality we'd need to know the state change
                    const matchedHint = this.tryMatchHint(handler.componentId, handler.methodName);
                    if (matchedHint) {
                        // 🟢 CACHE HIT! Apply patches instantly
                        const componentElement = this.findComponentElement(handler.componentId);
                        if (componentElement) {
                            this.domPatcher.applyPatches(componentElement, matchedHint.patches);
                            const latency = performance.now() - startTime;
                            // Notify playground of cache hit
                            if (this.playgroundBridge) {
                                this.playgroundBridge.cacheHit({
                                    componentId: handler.componentId,
                                    hintId: matchedHint.hintId,
                                    latency,
                                    confidence: matchedHint.confidence,
                                    patchCount: matchedHint.patches.length
                                });
                            }
                            this.log(`🟢 CACHE HIT! Applied ${matchedHint.patches.length} patches in ${latency.toFixed(2)}ms`, {
                                handler,
                                confidence: (matchedHint.confidence * 100).toFixed(0) + '%'
                            });
                            // Still notify server in background for verification
                            this.componentMethodInvoker(handler.componentId, handler.methodName, argsArray).catch(err => {
                                console.error('[Minimact] Background server notification failed:', err);
                            });
                            return;
                        }
                    }
                }
                // 🔴 CACHE MISS - No prediction found, send to server
                await this.componentMethodInvoker(handler.componentId, handler.methodName, argsArray);
                const latency = performance.now() - startTime;
                // Notify playground of cache miss
                if (this.playgroundBridge) {
                    this.playgroundBridge.cacheMiss({
                        componentId: handler.componentId,
                        methodName: handler.methodName,
                        latency,
                        patchCount: 0 // We don't know patch count in this flow
                    });
                }
                this.log(`🔴 CACHE MISS - Server latency: ${latency.toFixed(2)}ms`, { handler, argsObj });
            }
            catch (error) {
                console.error('[Minimact] Error executing handler:', handler, error);
            }
        }
        /**
         * Try to match a hint in the queue for this method invocation
         * Simplified version - checks if there's a hint matching the method name
         */
        tryMatchHint(componentId, methodName) {
            if (!this.hintQueue)
                return null;
            // In a real implementation, we'd need to build the predicted state change
            // For now, we'll use a simplified heuristic based on method name
            // The server sends hints with IDs like "count_1" for count going to 1
            // Try to match by checking all hints for this component
            // This is a placeholder - the actual matching logic would be more sophisticated
            return null; // TODO: Implement proper hint matching
        }
        /**
         * Find the component element by component ID
         */
        findComponentElement(componentId) {
            const element = this.rootElement.querySelector(`[data-minimact-component-id="${componentId}"]`);
            return element;
        }
        /**
         * Cleanup event listeners
         */
        destroy() {
            for (const [eventType, listener] of this.eventListeners.entries()) {
                this.rootElement.removeEventListener(eventType, listener, true);
            }
            this.eventListeners.clear();
            this.log('Event delegation destroyed');
        }
        /**
         * Debug logging
         */
        log(message, data) {
            if (this.debugLogging) {
                console.log(`[Minimact EventDelegation] ${message}`, data || '');
            }
        }
    }

    /**
     * Handles hydration of server-rendered HTML with client interactivity
     * Identifies and manages client zones, server zones, and hybrid zones
     */
    class HydrationManager {
        constructor(clientState, options = {}) {
            this.clientState = clientState;
            this.components = new Map();
            this.debugLogging = options.debugLogging || false;
        }
        /**
         * Hydrate a component root element
         */
        hydrateComponent(componentId, rootElement) {
            this.log('Hydrating component', { componentId });
            // The actual component element is the first child of the container
            // (rootElement is #minimact-root, first child is the actual component div)
            const componentElement = rootElement.firstElementChild;
            if (!componentElement) {
                console.error('[Minimact Hydration] No component element found in root');
                return;
            }
            // Create component metadata
            const metadata = {
                componentId,
                element: componentElement, // Use the actual component element, not the container
                clientState: {},
                serverState: {}
            };
            this.components.set(componentId, metadata);
            // Set component ID on root element
            rootElement.setAttribute('data-minimact-component-id', componentId);
            // Initialize client state
            this.clientState.initializeComponent(componentId);
            // Find and hydrate client zones
            this.hydrateClientZones(componentId, rootElement);
            // Find and bind state to elements
            this.bindStateElements(componentId, rootElement);
            this.log('Component hydrated', { componentId, metadata });
        }
        /**
         * Hydrate client-only zones (data-minimact-client-scope)
         */
        hydrateClientZones(componentId, rootElement) {
            const clientZones = rootElement.querySelectorAll('[data-minimact-client-scope]');
            this.log('Found client zones', { count: clientZones.length });
            clientZones.forEach((zone) => {
                const element = zone;
                // Get state name if specified
                const stateName = element.getAttribute('data-state');
                if (stateName) {
                    // Initialize state from element
                    const initialValue = this.getInitialValue(element);
                    this.clientState.setState(componentId, stateName, initialValue);
                    // Bind element to state
                    if (element instanceof HTMLInputElement ||
                        element instanceof HTMLTextAreaElement ||
                        element instanceof HTMLSelectElement) {
                        this.clientState.bindInput(componentId, stateName, element);
                    }
                    this.log('Hydrated client zone', { element, stateName, initialValue });
                }
            });
        }
        /**
         * Bind elements with data-bind attribute to state
         */
        bindStateElements(componentId, rootElement) {
            const boundElements = rootElement.querySelectorAll('[data-bind]');
            this.log('Found bound elements', { count: boundElements.length });
            boundElements.forEach((elem) => {
                const element = elem;
                const bindKey = element.getAttribute('data-bind');
                if (!bindKey) {
                    return;
                }
                // Determine binding type
                const isClientScope = this.isInClientScope(element);
                const bindProperty = this.determineBindProperty(element);
                if (isClientScope) {
                    // Client-side binding
                    this.clientState.bindToElement(componentId, bindKey, element, bindProperty);
                    this.log('Bound to client state', { element, bindKey, bindProperty });
                }
                else {
                    // Server-side binding - will be updated via patches
                    this.log('Server-bound element (patch-controlled)', { element, bindKey });
                }
            });
        }
        /**
         * Check if an element is within a client scope
         */
        isInClientScope(element) {
            let current = element;
            while (current) {
                if (current.hasAttribute('data-minimact-client-scope')) {
                    return true;
                }
                if (current.hasAttribute('data-minimact-server-scope')) {
                    return false;
                }
                current = current.parentElement;
            }
            return false;
        }
        /**
         * Determine which property to bind (value, textContent, innerHTML)
         */
        determineBindProperty(element) {
            if (element instanceof HTMLInputElement ||
                element instanceof HTMLTextAreaElement ||
                element instanceof HTMLSelectElement) {
                return 'value';
            }
            if (element.hasAttribute('data-bind-html')) {
                return 'innerHTML';
            }
            return 'textContent';
        }
        /**
         * Get initial value from an element
         */
        getInitialValue(element) {
            if (element instanceof HTMLInputElement) {
                if (element.type === 'checkbox') {
                    return element.checked;
                }
                else if (element.type === 'number') {
                    return element.valueAsNumber || 0;
                }
                else {
                    return element.value;
                }
            }
            if (element instanceof HTMLTextAreaElement) {
                return element.value;
            }
            if (element instanceof HTMLSelectElement) {
                return element.value;
            }
            return element.textContent || '';
        }
        /**
         * Dehydrate (cleanup) a component
         */
        dehydrateComponent(componentId) {
            const metadata = this.components.get(componentId);
            if (!metadata) {
                return;
            }
            // Clear client state
            this.clientState.clearComponent(componentId);
            // Remove from registry
            this.components.delete(componentId);
            this.log('Component dehydrated', { componentId });
        }
        /**
         * Get component metadata
         */
        getComponent(componentId) {
            return this.components.get(componentId);
        }
        /**
         * Update server state for a component
         */
        updateServerState(componentId, key, value) {
            const metadata = this.components.get(componentId);
            if (metadata) {
                metadata.serverState[key] = value;
                this.log('Updated server state', { componentId, key, value });
            }
        }
        /**
         * Hydrate all components on the page
         */
        hydrateAll() {
            const components = document.querySelectorAll('[data-minimact-component]');
            this.log('Hydrating all components', { count: components.length });
            components.forEach((element) => {
                const componentId = element.getAttribute('data-minimact-component');
                if (componentId) {
                    this.hydrateComponent(componentId, element);
                }
            });
        }
        /**
         * Debug logging
         */
        log(message, data) {
            if (this.debugLogging) {
                console.log(`[Minimact Hydration] ${message}`, data || '');
            }
        }
    }

    /**
     * Template Renderer
     *
     * Renders template patches with parameter values for runtime predictions.
     * Enables 98% memory reduction by storing patterns instead of concrete values.
     *
     * Example:
     *   template: "Count: {0}"
     *   params: [42]
     *   result: "Count: 42"
     */
    class TemplateRenderer {
        /**
         * Render a template string with parameters
         *
         * @param template - Template string with {0}, {1}, etc. placeholders
         * @param params - Parameter values to substitute
         * @returns Rendered string with parameters substituted
         *
         * @example
         * renderTemplate("Count: {0}", [42]) → "Count: 42"
         * renderTemplate("Hello, {0} {1}!", ["John", "Doe"]) → "Hello, John Doe!"
         */
        static renderTemplate(template, params) {
            let result = template;
            // Replace each placeholder {0}, {1}, etc. with corresponding parameter
            params.forEach((param, index) => {
                const placeholder = `{${index}}`;
                const value = this.formatValue(param);
                result = result.replace(placeholder, value);
            });
            return result;
        }
        /**
         * Render a template patch with current state values
         *
         * @param templatePatch - Template patch data
         * @param stateValues - Current state values (key-value pairs)
         * @returns Rendered string
         *
         * @example
         * const tp = { template: "Count: {0}", bindings: ["count"], slots: [7] };
         * renderTemplatePatch(tp, { count: 42 }) → "Count: 42"
         *
         * @example Conditional
         * const tp = {
         *   template: "{0}",
         *   bindings: ["isActive"],
         *   conditionalTemplates: { "true": "Active", "false": "Inactive" },
         *   conditionalBindingIndex: 0
         * };
         * renderTemplatePatch(tp, { isActive: true }) → "Active"
         */
        static renderTemplatePatch(templatePatch, stateValues) {
            // Check for conditional templates
            if (templatePatch.conditionalTemplates && templatePatch.conditionalBindingIndex !== undefined) {
                const bindingIndex = templatePatch.conditionalBindingIndex;
                const conditionBinding = templatePatch.bindings[bindingIndex];
                // Get condition value (handle both string and Binding object)
                const conditionKey = typeof conditionBinding === 'object' && 'stateKey' in conditionBinding
                    ? conditionBinding.stateKey
                    : conditionBinding;
                const conditionValue = stateValues[conditionKey];
                // Lookup the template for this condition value
                const conditionalTemplate = templatePatch.conditionalTemplates[String(conditionValue)];
                if (conditionalTemplate !== undefined) {
                    // If it's a simple conditional (just maps to string), return it
                    if (!conditionalTemplate.includes('{')) {
                        return conditionalTemplate;
                    }
                    // Otherwise, it's a conditional template with other bindings
                    // Apply transforms if present
                    const params = templatePatch.bindings.map(binding => {
                        if (typeof binding === 'object' && 'stateKey' in binding) {
                            const value = stateValues[binding.stateKey];
                            return binding.transform ? this.applyTransform(value, binding.transform) : value;
                        }
                        return stateValues[binding];
                    });
                    return this.renderTemplate(conditionalTemplate, params);
                }
            }
            // Standard template rendering
            const params = templatePatch.bindings.map((binding, index) => {
                // Phase 6: Support Binding objects with transforms
                if (typeof binding === 'object' && 'stateKey' in binding) {
                    const value = stateValues[binding.stateKey];
                    // Apply transform if present
                    if (binding.transform) {
                        return this.applyTransform(value, binding.transform);
                    }
                    return value;
                }
                // Backward compatibility: Simple string binding
                return stateValues[binding];
            });
            return this.renderTemplate(templatePatch.template, params);
        }
        /**
         * Convert a template patch to concrete patch(es) with current state
         *
         * @param patch - Template patch (UpdateTextTemplate, UpdatePropsTemplate, or UpdateListTemplate)
         * @param stateValues - Current state values
         * @returns Concrete patch or array of patches
         *
         * @example
         * const patch = {
         *   type: 'UpdateTextTemplate',
         *   path: [0, 0],
         *   templatePatch: { template: "Count: {0}", bindings: ["count"], slots: [7] }
         * };
         * materializePatch(patch, { count: 42 })
         * → { type: 'UpdateText', path: [0, 0], content: "Count: 42" }
         */
        static materializePatch(patch, stateValues) {
            switch (patch.type) {
                case 'UpdateTextTemplate': {
                    const content = this.renderTemplatePatch(patch.templatePatch, stateValues);
                    return {
                        type: 'UpdateText',
                        path: patch.path,
                        content
                    };
                }
                case 'UpdatePropsTemplate': {
                    const value = this.renderTemplatePatch(patch.templatePatch, stateValues);
                    return {
                        type: 'UpdateProps',
                        path: patch.path,
                        props: { [patch.propName]: value }
                    };
                }
                case 'UpdateListTemplate': {
                    // Render loop template to VNodes
                    const vnodes = this.renderLoopTemplate(patch.loopTemplate, stateValues);
                    // Convert to concrete patches
                    return this.convertLoopToPatches(patch.path, vnodes);
                }
                default:
                    // Not a template patch, return as-is
                    return patch;
            }
        }
        /**
         * Materialize multiple template patches
         *
         * @param patches - Array of patches (template or concrete)
         * @param stateValues - Current state values
         * @returns Array of concrete patches
         */
        static materializePatches(patches, stateValues) {
            const materialized = [];
            for (const patch of patches) {
                const result = this.materializePatch(patch, stateValues);
                if (Array.isArray(result)) {
                    // UpdateListTemplate returns multiple patches
                    materialized.push(...result);
                }
                else {
                    materialized.push(result);
                }
            }
            return materialized;
        }
        /**
         * Apply transform to a value (Phase 6: Expression Templates)
         * Security: Only whitelisted transforms are allowed
         *
         * @param value - Raw value from state
         * @param transform - Transform string (e.g., "toFixed(2)", "* 100", "toUpperCase()")
         * @returns Transformed value
         *
         * @example
         * applyTransform(99.95, "toFixed(2)") → "99.95"
         * applyTransform(0.847, "* 100") → 84.7
         * applyTransform("hello", "toUpperCase()") → "HELLO"
         */
        static applyTransform(value, transform) {
            // Security: Whitelist-only approach for safe transforms
            // toFixed(n) - Format number to n decimal places
            if (transform.startsWith('toFixed(')) {
                const decimals = parseInt(transform.match(/\d+/)?.[0] || '0');
                return Number(value).toFixed(decimals);
            }
            // Arithmetic: * N (multiplication)
            if (transform.startsWith('* ')) {
                const multiplier = parseFloat(transform.substring(2));
                return Number(value) * multiplier;
            }
            // Arithmetic: / N (division)
            if (transform.startsWith('/ ')) {
                const divisor = parseFloat(transform.substring(2));
                return Number(value) / divisor;
            }
            // Arithmetic: + N (addition)
            if (transform.startsWith('+ ')) {
                const addend = parseFloat(transform.substring(2));
                return Number(value) + addend;
            }
            // Arithmetic: - N (subtraction)
            if (transform.startsWith('- ')) {
                const subtrahend = parseFloat(transform.substring(2));
                return Number(value) - subtrahend;
            }
            // String: toUpperCase()
            if (transform === 'toUpperCase()' || transform === 'toUpperCase') {
                return String(value).toUpperCase();
            }
            // String: toLowerCase()
            if (transform === 'toLowerCase()' || transform === 'toLowerCase') {
                return String(value).toLowerCase();
            }
            // String: trim()
            if (transform === 'trim()' || transform === 'trim') {
                return String(value).trim();
            }
            // Boolean: ! (negation)
            if (transform === '!') {
                return !value;
            }
            // Default: Unknown transform, log warning and return value as-is
            console.warn(`[TemplateRenderer] Unknown transform: ${transform}`);
            return value;
        }
        /**
         * Format a value for template substitution
         *
         * @param value - Value to format
         * @returns String representation of value
         */
        static formatValue(value) {
            if (value === null || value === undefined) {
                return '';
            }
            if (typeof value === 'string') {
                return value;
            }
            if (typeof value === 'number' || typeof value === 'boolean') {
                return String(value);
            }
            if (Array.isArray(value)) {
                return value.map(v => this.formatValue(v)).join(', ');
            }
            if (typeof value === 'object') {
                // For objects, use JSON.stringify (could be customized)
                return JSON.stringify(value);
            }
            return String(value);
        }
        /**
         * Check if a patch is a template patch
         *
         * @param patch - Patch to check
         * @returns True if patch is a template patch
         */
        static isTemplatePatch(patch) {
            return patch.type === 'UpdateTextTemplate' || patch.type === 'UpdatePropsTemplate';
        }
        /**
         * Extract bindings from a template patch
         *
         * @param patch - Template patch
         * @returns Array of state variable names, or empty array if not a template patch
         */
        static extractBindings(patch) {
            if (patch.type === 'UpdateTextTemplate' || patch.type === 'UpdatePropsTemplate') {
                // Handle both string bindings and Binding objects
                return patch.templatePatch.bindings.map(binding => {
                    if (typeof binding === 'object' && 'stateKey' in binding) {
                        return binding.stateKey;
                    }
                    return binding;
                });
            }
            return [];
        }
        /**
         * Validate that all required bindings are present in state
         *
         * @param templatePatch - Template patch to validate
         * @param stateValues - Available state values
         * @returns True if all bindings are present
         */
        static validateBindings(templatePatch, stateValues) {
            return templatePatch.bindings.every(binding => {
                const key = typeof binding === 'object' && 'stateKey' in binding
                    ? binding.stateKey
                    : binding;
                return key in stateValues;
            });
        }
        /**
         * Get missing bindings from state
         *
         * @param templatePatch - Template patch to check
         * @param stateValues - Available state values
         * @returns Array of missing binding names
         */
        static getMissingBindings(templatePatch, stateValues) {
            return templatePatch.bindings
                .filter(binding => {
                const key = typeof binding === 'object' && 'stateKey' in binding
                    ? binding.stateKey
                    : binding;
                return !(key in stateValues);
            })
                .map(binding => {
                if (typeof binding === 'object' && 'stateKey' in binding) {
                    return binding.stateKey;
                }
                return binding;
            });
        }
        /**
         * Render loop template with current array state
         *
         * @param loopTemplate - Loop template data
         * @param stateValues - Current state values (must include array binding)
         * @returns Array of rendered VNodes
         *
         * @example
         * const template = {
         *   array_binding: "todos",
         *   item_template: {
         *     type: "Element",
         *     tag: "li",
         *     children_templates: [{
         *       type: "Text",
         *       template_patch: { template: "{0}", bindings: ["item.text"], slots: [0] }
         *     }]
         *   }
         * };
         * renderLoopTemplate(template, { todos: [{ text: "A" }, { text: "B" }] })
         * → [<li>A</li>, <li>B</li>]
         */
        static renderLoopTemplate(loopTemplate, stateValues) {
            const array = stateValues[loopTemplate.array_binding];
            if (!Array.isArray(array)) {
                console.warn(`[TemplateRenderer] Expected array for '${loopTemplate.array_binding}', got:`, array);
                return [];
            }
            return array.map((item, index) => {
                // Build item state with nested object access
                const itemState = {
                    ...stateValues,
                    item,
                    index,
                    ...(loopTemplate.index_var ? { [loopTemplate.index_var]: index } : {})
                };
                // Flatten item object for binding access (item.text → "item.text": value)
                const flattenedState = this.flattenItemState(itemState, item);
                // Render item template
                return this.renderItemTemplate(loopTemplate.item_template, flattenedState);
            });
        }
        /**
         * Flatten item object for template binding access
         *
         * @param itemState - Current state including item
         * @param item - The array item to flatten
         * @returns Flattened state with "item.property" keys
         *
         * @example
         * flattenItemState({ item: { id: 1, text: "A" } }, { id: 1, text: "A" })
         * → { "item.id": 1, "item.text": "A", item: {...}, ... }
         */
        static flattenItemState(itemState, item) {
            const flattened = { ...itemState };
            if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
                // Flatten object properties with "item." prefix
                for (const key in item) {
                    flattened[`item.${key}`] = item[key];
                }
            }
            return flattened;
        }
        /**
         * Render item template to VNode
         *
         * @param itemTemplate - Template for individual list item
         * @param stateValues - State values with flattened item properties
         * @returns Rendered VNode
         */
        static renderItemTemplate(itemTemplate, stateValues) {
            switch (itemTemplate.type) {
                case 'Text': {
                    const content = this.renderTemplatePatch(itemTemplate.template_patch, stateValues);
                    return {
                        type: 'Text',
                        content
                    };
                }
                case 'Element': {
                    // Render props
                    const props = {};
                    if (itemTemplate.props_templates) {
                        for (const [propName, propTemplate] of Object.entries(itemTemplate.props_templates)) {
                            props[propName] = this.renderTemplatePatch(propTemplate, stateValues);
                        }
                    }
                    // Render children
                    const children = (itemTemplate.children_templates || []).map(childTemplate => this.renderItemTemplate(childTemplate, stateValues));
                    // Render key
                    const key = itemTemplate.key_binding
                        ? String(stateValues[itemTemplate.key_binding])
                        : undefined;
                    return {
                        type: 'Element',
                        tag: itemTemplate.tag,
                        props,
                        children,
                        key
                    };
                }
                default:
                    throw new Error(`Unknown item template type: ${itemTemplate.type}`);
            }
        }
        /**
         * Convert rendered loop VNodes to concrete patches
         * Generates Create/Replace patches for list update
         *
         * @param parentPath - Path to parent element containing the list
         * @param vnodes - Rendered VNodes for list items
         * @returns Array of patches to update the list
         */
        static convertLoopToPatches(parentPath, vnodes) {
            // For Phase 4A simplicity: Replace entire list with Create patches
            // TODO Phase 4C: Optimize with incremental diffing
            return vnodes.map((node, index) => ({
                type: 'Create',
                path: [...parentPath, index],
                node
            }));
        }
    }

    /**
     * Manages hint queue for usePredictHint
     * Stores pre-computed patches and applies them when state changes match
     */
    class HintQueue {
        constructor(options = {}) {
            this.hints = new Map();
            this.maxHintAge = 5000; // 5 seconds TTL
            this.debugLogging = options.debugLogging || false;
        }
        /**
         * Queue a hint from the server
         */
        queueHint(data) {
            const key = `${data.componentId}:${data.hintId}`;
            // Check if this hint contains template patches
            const isTemplate = data.patches.some(patch => TemplateRenderer.isTemplatePatch(patch));
            this.hints.set(key, {
                ...data,
                queuedAt: Date.now(),
                isTemplate
            });
            const patchType = isTemplate ? '📐 TEMPLATE' : '📄 CONCRETE';
            this.log(`${patchType} hint '${data.hintId}' queued for ${data.componentId}`, data);
            // Auto-expire old hints
            this.cleanupStaleHints();
        }
        /**
         * Check if a state change matches any queued hint
         * Returns patches if match found, null otherwise
         */
        matchHint(componentId, stateChanges) {
            // Find hints for this component
            const componentHints = Array.from(this.hints.entries())
                .filter(([key]) => key.startsWith(`${componentId}:`))
                .map(([, hint]) => hint);
            // Check each hint to see if it matches the state change
            for (const hint of componentHints) {
                if (this.stateMatches(hint.predictedState, stateChanges)) {
                    const patchType = hint.isTemplate ? '📐 TEMPLATE' : '📄 CONCRETE';
                    this.log(`${patchType} hint '${hint.hintId}' matched!`, { hint, stateChanges });
                    // Remove from queue
                    const key = `${componentId}:${hint.hintId}`;
                    this.hints.delete(key);
                    // Materialize template patches with current state values
                    const materializedPatches = TemplateRenderer.materializePatches(hint.patches, stateChanges);
                    return {
                        hintId: hint.hintId,
                        patches: materializedPatches,
                        confidence: hint.confidence
                    };
                }
            }
            return null;
        }
        /**
         * Check if predicted state matches actual state change
         */
        stateMatches(predicted, actual) {
            // Check if all predicted keys match actual values
            for (const [key, predictedValue] of Object.entries(predicted)) {
                if (!(key in actual)) {
                    return false; // Key not in actual change
                }
                // Deep equality check (simplified - could use lodash.isEqual in production)
                if (JSON.stringify(actual[key]) !== JSON.stringify(predictedValue)) {
                    return false; // Value doesn't match
                }
            }
            return true;
        }
        /**
         * Remove hints older than maxHintAge
         */
        cleanupStaleHints() {
            const now = Date.now();
            const staleKeys = [];
            for (const [key, hint] of this.hints.entries()) {
                if (now - hint.queuedAt > this.maxHintAge) {
                    staleKeys.push(key);
                }
            }
            if (staleKeys.length > 0) {
                this.log(`Removing ${staleKeys.length} stale hint(s)`, staleKeys);
                for (const key of staleKeys) {
                    this.hints.delete(key);
                }
            }
        }
        /**
         * Clear all hints for a component
         */
        clearComponent(componentId) {
            const keysToRemove = Array.from(this.hints.keys())
                .filter(key => key.startsWith(`${componentId}:`));
            for (const key of keysToRemove) {
                this.hints.delete(key);
            }
            if (keysToRemove.length > 0) {
                this.log(`Cleared ${keysToRemove.length} hint(s) for component ${componentId}`);
            }
        }
        /**
         * Clear all hints
         */
        clearAll() {
            this.hints.clear();
            this.log('Cleared all hints');
        }
        /**
         * Get stats about queued hints
         */
        getStats() {
            const allHints = Array.from(this.hints.values());
            const templateHints = allHints.filter(h => h.isTemplate);
            const concreteHints = allHints.filter(h => !h.isTemplate);
            return {
                totalHints: this.hints.size,
                templateHints: templateHints.length,
                concreteHints: concreteHints.length,
                templatePercentage: this.hints.size > 0
                    ? Math.round((templateHints.length / this.hints.size) * 100)
                    : 0,
                hintsByComponent: allHints.reduce((acc, hint) => {
                    acc[hint.componentId] = (acc[hint.componentId] || 0) + 1;
                    return acc;
                }, {})
            };
        }
        log(message, ...args) {
            if (this.debugLogging) {
                console.log(`[Minimact HintQueue] ${message}`, ...args);
            }
        }
    }

    /**
     * Bridge for communicating prediction events to playground parent window
     * Emits postMessage events that the React playground can listen to
     */
    class PlaygroundBridge {
        constructor(options = {}) {
            this.debugLogging = options.debugLogging || false;
        }
        /**
         * Notify that a prediction was received from server
         */
        predictionReceived(data) {
            this.postMessage({
                type: 'minimact:prediction-received',
                data
            });
            this.log('Prediction received', data);
        }
        /**
         * Notify that a cache hit occurred (instant patch application)
         */
        cacheHit(data) {
            this.postMessage({
                type: 'minimact:cache-hit',
                data: {
                    ...data,
                    cacheHit: true,
                    elapsedMs: data.latency
                }
            });
            this.log('🟢 CACHE HIT', data);
        }
        /**
         * Notify that a cache miss occurred (had to compute on server)
         */
        cacheMiss(data) {
            this.postMessage({
                type: 'minimact:cache-miss',
                data: {
                    ...data,
                    cacheHit: false,
                    elapsedMs: data.latency,
                    predictionConfidence: 0
                }
            });
            this.log('🔴 CACHE MISS', data);
        }
        /**
         * Notify that a correction was applied (prediction was wrong)
         */
        correctionApplied(data) {
            this.postMessage({
                type: 'minimact:correction',
                data
            });
            this.log('Correction applied (prediction was incorrect)', data);
        }
        /**
         * Post message to parent window (for iframe communication)
         */
        postMessage(message) {
            // Check if we're in an iframe
            if (window.parent && window.parent !== window) {
                window.parent.postMessage(message, '*');
            }
            // Also dispatch as custom event for same-window listeners
            window.dispatchEvent(new CustomEvent(message.type, { detail: message.data }));
        }
        log(message, data) {
            if (this.debugLogging) {
                console.log(`[Minimact PlaygroundBridge] ${message}`, data || '');
            }
        }
    }

    /**
     * Client-Computed State Manager
     *
     * Manages variables that are computed on the client using external libraries
     * (lodash, moment, etc.) and syncs them to the server for SSR.
     *
     * This enables Option 1 auto-detection: developers use external libraries
     * naturally, and the system automatically handles client-server sync.
     */
    const computedRegistry = {};
    /**
     * Debug logging
     */
    let debugLogging = false;
    function setDebugLogging(enabled) {
        debugLogging = enabled;
    }
    function log(message, data) {
        if (debugLogging) {
            console.log(`[ClientComputed] ${message}`, data || '');
        }
    }
    /**
     * Register a client-computed variable for a component
     *
     * @param componentId - Unique identifier for the component
     * @param varName - Name of the variable being computed
     * @param computeFn - Function that computes the value
     * @param dependencies - Optional list of state keys this variable depends on
     */
    function registerClientComputed(componentId, varName, computeFn, dependencies) {
        if (!computedRegistry[componentId]) {
            computedRegistry[componentId] = {};
        }
        computedRegistry[componentId][varName] = {
            varName,
            computeFn,
            dependencies
        };
        log(`Registered client-computed variable`, { componentId, varName, dependencies });
    }
    /**
     * Compute a single variable's value
     *
     * @param componentId - Component identifier
     * @param varName - Variable name
     * @returns The computed value or undefined if not found
     */
    function computeVariable(componentId, varName) {
        const computed = computedRegistry[componentId]?.[varName];
        if (!computed) {
            console.warn(`[ClientComputed] Variable '${varName}' not registered for component '${componentId}'`);
            return undefined;
        }
        try {
            const value = computed.computeFn();
            computed.lastValue = value;
            log(`Computed variable`, { componentId, varName, value });
            return value;
        }
        catch (error) {
            console.error(`[ClientComputed] Error computing '${varName}':`, error);
            return undefined;
        }
    }
    /**
     * Compute all client-computed variables for a component
     *
     * @param componentId - Component identifier
     * @returns Object with all computed values
     */
    function computeAllForComponent(componentId) {
        const computed = computedRegistry[componentId];
        if (!computed) {
            log(`No computed variables for component`, { componentId });
            return {};
        }
        const result = {};
        for (const [varName, variable] of Object.entries(computed)) {
            try {
                const value = variable.computeFn();
                variable.lastValue = value;
                result[varName] = value;
            }
            catch (error) {
                console.error(`[ClientComputed] Error computing '${varName}':`, error);
                result[varName] = undefined;
            }
        }
        log(`Computed all variables`, { componentId, result });
        return result;
    }
    /**
     * Compute only variables that depend on a specific state key
     *
     * @param componentId - Component identifier
     * @param changedStateKey - State key that changed
     * @returns Object with affected computed values
     */
    function computeDependentVariables(componentId, changedStateKey) {
        const computed = computedRegistry[componentId];
        if (!computed) {
            return {};
        }
        const result = {};
        for (const [varName, variable] of Object.entries(computed)) {
            // If no dependencies specified, assume it depends on everything
            const shouldRecompute = !variable.dependencies ||
                variable.dependencies.includes(changedStateKey);
            if (shouldRecompute) {
                try {
                    const value = variable.computeFn();
                    variable.lastValue = value;
                    result[varName] = value;
                    log(`Recomputed dependent variable`, { componentId, varName, changedStateKey, value });
                }
                catch (error) {
                    console.error(`[ClientComputed] Error recomputing '${varName}':`, error);
                    result[varName] = undefined;
                }
            }
        }
        return result;
    }
    /**
     * Get the last computed value without recomputing
     *
     * @param componentId - Component identifier
     * @param varName - Variable name
     * @returns The last computed value or undefined
     */
    function getLastValue(componentId, varName) {
        return computedRegistry[componentId]?.[varName]?.lastValue;
    }
    /**
     * Get all last computed values without recomputing
     *
     * @param componentId - Component identifier
     * @returns Object with all last computed values
     */
    function getAllLastValues(componentId) {
        const computed = computedRegistry[componentId];
        if (!computed) {
            return {};
        }
        const result = {};
        for (const [varName, variable] of Object.entries(computed)) {
            result[varName] = variable.lastValue;
        }
        return result;
    }
    /**
     * Check if a component has any client-computed variables
     *
     * @param componentId - Component identifier
     * @returns True if component has computed variables
     */
    function hasClientComputed(componentId) {
        return !!computedRegistry[componentId] &&
            Object.keys(computedRegistry[componentId]).length > 0;
    }
    /**
     * Get list of all computed variable names for a component
     *
     * @param componentId - Component identifier
     * @returns Array of variable names
     */
    function getComputedVariableNames(componentId) {
        const computed = computedRegistry[componentId];
        return computed ? Object.keys(computed) : [];
    }
    /**
     * Clear all computed variables for a component
     * Used when component is unmounted
     *
     * @param componentId - Component identifier
     */
    function clearComponent(componentId) {
        delete computedRegistry[componentId];
        log(`Cleared component`, { componentId });
    }
    /**
     * Get debug info about registered computations
     * Useful for dev tools / debugging
     */
    function getDebugInfo() {
        const components = {};
        for (const [componentId, computed] of Object.entries(computedRegistry)) {
            const variables = Object.keys(computed);
            components[componentId] = {
                variableCount: variables.length,
                variables
            };
        }
        return {
            componentCount: Object.keys(computedRegistry).length,
            components
        };
    }

    /**
     * Template State Manager - Client-Side Template Rendering
     *
     * Manages "virtual state" for text nodes using parameterized templates.
     * This enables instant hot reload with 100% coverage and minimal memory.
     *
     * Architecture:
     * - Templates loaded from .templates.json at component init
     * - State changes trigger template re-rendering
     * - Hot reload updates templates without server round-trip
     *
     * Memory: ~2KB per component (vs 100KB with prediction-based approach)
     * Coverage: 100% (works with any value)
     * Latency: <5ms for template updates
     */
    /**
     * Template State Manager
     */
    class TemplateStateManager {
        constructor() {
            this.templates = new Map();
            this.componentStates = new Map();
        }
        /**
         * Initialize templates from .templates.json file
         */
        loadTemplateMap(componentId, templateMap) {
            console.log(`[TemplateState] Loading ${Object.keys(templateMap.templates).length} templates for ${componentId}`);
            for (const [nodePath, template] of Object.entries(templateMap.templates)) {
                const key = `${componentId}:${nodePath}`;
                this.templates.set(key, template);
            }
            // Initialize component state tracking
            if (!this.componentStates.has(componentId)) {
                this.componentStates.set(componentId, new Map());
            }
        }
        /**
         * Register a template for a specific node path
         */
        registerTemplate(componentId, nodePath, template) {
            const key = `${componentId}:${nodePath}`;
            this.templates.set(key, template);
        }
        /**
         * Get template by component ID and node path
         */
        getTemplate(componentId, nodePath) {
            const key = `${componentId}:${nodePath}`;
            return this.templates.get(key);
        }
        /**
         * Get all templates for a component
         */
        getComponentTemplates(componentId) {
            const result = new Map();
            for (const [key, template] of this.templates.entries()) {
                if (key.startsWith(`${componentId}:`)) {
                    const nodePath = key.substring(componentId.length + 1);
                    result.set(nodePath, template);
                }
            }
            return result;
        }
        /**
         * Get templates bound to a specific state variable
         */
        getTemplatesBoundTo(componentId, stateKey) {
            const templates = [];
            for (const [key, template] of this.templates.entries()) {
                if (key.startsWith(`${componentId}:`) && template.bindings.includes(stateKey)) {
                    templates.push(template);
                }
            }
            return templates;
        }
        /**
         * Update component state (from useState)
         */
        updateState(componentId, stateKey, value) {
            let state = this.componentStates.get(componentId);
            if (!state) {
                state = new Map();
                this.componentStates.set(componentId, state);
            }
            state.set(stateKey, value);
        }
        /**
         * Get component state value
         */
        getStateValue(componentId, stateKey) {
            return this.componentStates.get(componentId)?.get(stateKey);
        }
        /**
         * Render template with current state values
         */
        render(componentId, nodePath) {
            const template = this.getTemplate(componentId, nodePath);
            if (!template)
                return null;
            // Get state values for bindings
            const params = template.bindings.map(binding => this.getStateValue(componentId, binding));
            return this.renderWithParams(template.template, params);
        }
        /**
         * Render template with specific parameter values
         */
        renderWithParams(template, params) {
            let result = template;
            // Replace {0}, {1}, etc. with parameter values
            params.forEach((param, index) => {
                const placeholder = `{${index}}`;
                const value = param !== undefined && param !== null ? String(param) : '';
                result = result.replace(placeholder, value);
            });
            return result;
        }
        /**
         * Apply template patch from hot reload
         */
        applyTemplatePatch(patch) {
            const { componentId, path, template, params, bindings, slots, attribute } = patch;
            // Render template with params
            const text = this.renderWithParams(template, params);
            // Build node path key
            const nodePath = this.buildNodePathKey(path);
            const key = `${componentId}:${nodePath}`;
            // Update stored template
            const existingTemplate = this.templates.get(key);
            if (existingTemplate) {
                existingTemplate.template = template;
                existingTemplate.bindings = bindings;
                existingTemplate.slots = slots;
                if (attribute) {
                    existingTemplate.attribute = attribute;
                }
            }
            else {
                // Register new template
                this.templates.set(key, {
                    template,
                    bindings,
                    slots,
                    path,
                    type: attribute ? 'attribute' : 'dynamic',
                    attribute
                });
            }
            console.log(`[TemplateState] Applied template patch: "${template}" → "${text}"`);
            return { text, path };
        }
        /**
         * Build node path key from path array
         * Example: [0, 1, 0] → "0_1_0"
         */
        buildNodePathKey(path) {
            return path.join('_');
        }
        /**
         * Clear all templates for a component
         */
        clearComponent(componentId) {
            const keysToDelete = [];
            for (const key of this.templates.keys()) {
                if (key.startsWith(`${componentId}:`)) {
                    keysToDelete.push(key);
                }
            }
            for (const key of keysToDelete) {
                this.templates.delete(key);
            }
            this.componentStates.delete(componentId);
        }
        /**
         * Clear all templates
         */
        clear() {
            this.templates.clear();
            this.componentStates.clear();
        }
        /**
         * Get statistics
         */
        getStats() {
            const componentCount = this.componentStates.size;
            const templateCount = this.templates.size;
            // Estimate memory usage (rough estimate)
            let memoryBytes = 0;
            for (const template of this.templates.values()) {
                memoryBytes += template.template.length * 2; // UTF-16
                memoryBytes += template.bindings.length * 20; // Rough estimate
                memoryBytes += template.slots.length * 4; // 4 bytes per number
                memoryBytes += template.path.length * 4;
            }
            return {
                componentCount,
                templateCount,
                memoryKB: Math.round(memoryBytes / 1024),
                avgTemplatesPerComponent: templateCount / Math.max(componentCount, 1)
            };
        }
    }
    /**
     * Global template state manager instance
     */
    const templateState = new TemplateStateManager();

    /**
     * Server Task - Client-side representation of a long-running server task
     *
     * Provides reactive state management for async operations that execute on the server.
     * Automatically syncs state changes from server and triggers component re-renders.
     */
    /**
     * Server task implementation
     */
    class ServerTaskImpl {
        constructor(taskId, componentId, signalR, context, options = {}) {
            this.taskId = taskId;
            this.componentId = componentId;
            this.signalR = signalR;
            this.context = context;
            this.status = 'idle';
            this.progress = 0;
            this.chunks = [];
            this.chunkCount = 0;
            this._options = options;
            this.streaming = options.stream || false;
            this._createPromise();
        }
        _createPromise() {
            this._promise = new Promise((resolve, reject) => {
                this._resolve = resolve;
                this._reject = reject;
            });
        }
        get promise() {
            return this._promise;
        }
        get idle() {
            return this.status === 'idle';
        }
        get running() {
            return this.status === 'running';
        }
        get complete() {
            return this.status === 'complete';
        }
        get failed() {
            return this.status === 'error';
        }
        get cancelled() {
            return this.status === 'cancelled';
        }
        /**
         * Start the server task with optional arguments
         */
        start(...args) {
            this.status = 'running';
            this.startedAt = new Date();
            this.completedAt = undefined;
            this.progress = 0;
            this.error = undefined;
            // Clear previous results
            if (this.streaming) {
                this.chunks = [];
                this.chunkCount = 0;
                this.partial = undefined;
            }
            else {
                this.result = undefined;
            }
            // Trigger re-render to show "running" state immediately
            this._triggerRerender();
            // Invoke server task via SignalR
            this.signalR.invoke('StartServerTask', this.componentId, this.taskId, args || [])
                .catch((err) => {
                console.error(`[Minimact] Failed to start task ${this.taskId}:`, err);
                this.status = 'error';
                this.error = err;
                this.completedAt = new Date();
                this.duration = this.completedAt.getTime() - (this.startedAt?.getTime() || 0);
                this._reject?.(err);
                this._triggerRerender();
            });
        }
        /**
         * Retry a failed or cancelled task
         */
        retry(...args) {
            if (this.status !== 'error' && this.status !== 'cancelled') {
                console.warn('[Minimact] Can only retry failed or cancelled tasks');
                return;
            }
            // Reset promise for new attempt
            this._createPromise();
            this.status = 'running';
            this.startedAt = new Date();
            this.completedAt = undefined;
            this.progress = 0;
            this.error = undefined;
            if (this.streaming) {
                this.chunks = [];
                this.chunkCount = 0;
                this.partial = undefined;
            }
            else {
                this.result = undefined;
            }
            this._triggerRerender();
            this.signalR.invoke('RetryServerTask', this.componentId, this.taskId, args || [])
                .catch((err) => {
                console.error(`[Minimact] Failed to retry task ${this.taskId}:`, err);
                this.status = 'error';
                this.error = err;
                this.completedAt = new Date();
                this.duration = this.completedAt.getTime() - (this.startedAt?.getTime() || 0);
                this._reject?.(err);
                this._triggerRerender();
            });
        }
        /**
         * Cancel a running task
         */
        cancel() {
            if (this.status !== 'running') {
                console.warn('[Minimact] Can only cancel running tasks');
                return;
            }
            this.signalR.invoke('CancelServerTask', this.componentId, this.taskId)
                .then(() => {
                this.status = 'cancelled';
                this.completedAt = new Date();
                this.duration = this.completedAt.getTime() - (this.startedAt?.getTime() || 0);
                this._reject?.(new Error('Task cancelled by user'));
                this._triggerRerender();
            })
                .catch((err) => {
                console.error(`[Minimact] Failed to cancel task ${this.taskId}:`, err);
            });
        }
        /**
         * Update task state from server
         * Called by Minimact when server sends task state updates via SignalR
         */
        _updateFromServer(state) {
            const previousStatus = this.status;
            this.status = state.status;
            this.progress = state.progress || 0;
            this.result = state.result;
            if (state.error) {
                this.error = new Error(state.error);
            }
            if (state.startedAt) {
                this.startedAt = new Date(state.startedAt);
            }
            if (state.completedAt) {
                this.completedAt = new Date(state.completedAt);
            }
            if (state.duration) {
                this.duration = state.duration;
            }
            // Resolve/reject promise based on status change
            if (this.status === 'complete' && previousStatus !== 'complete') {
                if (this._resolve) {
                    this._resolve(this.result);
                }
            }
            else if (this.status === 'error' && previousStatus !== 'error') {
                if (this._reject) {
                    this._reject(this.error);
                }
            }
            else if (this.status === 'cancelled' && previousStatus !== 'cancelled') {
                if (this._reject) {
                    this._reject(new Error('Task cancelled'));
                }
            }
            // Trigger re-render when state changes
            if (previousStatus !== this.status || this.progress !== state.progress) {
                this._triggerRerender();
            }
        }
        /**
         * Trigger component re-render
         * Uses hint queue to check for predicted patches
         */
        _triggerRerender() {
            if (!this.context || !this.context.hintQueue) {
                return;
            }
            const stateChanges = {
                [this.taskId]: {
                    status: this.status,
                    progress: this.progress,
                    chunkCount: this.chunkCount
                }
            };
            const hint = this.context.hintQueue.matchHint(this.context.componentId, stateChanges);
            if (hint) {
                // Cache hit! Apply predicted patches
                console.log(`[Minimact] 🟢 Task state change predicted! Applying ${hint.patches.length} patches`);
                this.context.domPatcher.applyPatches(this.context.element, hint.patches);
            }
            else {
                // Cache miss - server will send patches
                console.log(`[Minimact] 🔴 Task state change not predicted`);
            }
        }
    }

    /**
     * useComputed Hook
     *
     * Compute values on the client using browser-only APIs or external libraries,
     * then sync to the server for rendering.
     *
     * This replaces the conceptually flawed "useClientState" with a sound approach:
     * - Client computes values using browser APIs (lodash, moment, geolocation, crypto)
     * - Results are synced to server via UpdateClientComputedState
     * - Server accesses values via GetClientState<T>(key) for rendering
     * - Server still does ALL rendering (dehydrationist architecture)
     */
    let currentContext$2 = null;
    /**
     * Set the current component context for useComputed
     * Called by setComponentContext in hooks.ts
     */
    function setComputedContext(context) {
        currentContext$2 = context;
    }
    /**
     * useComputed Hook
     *
     * @param key - Unique identifier for server-side access via GetClientState<T>(key)
     * @param computeFn - Function that computes the value (runs on client)
     * @param deps - Dependency array (like useEffect)
     * @param options - Configuration options
     * @returns The computed value
     *
     * @example
     * // With lodash
     * const sortedUsers = useComputed('sortedUsers', () => {
     *   return _.sortBy(users, 'name');
     * }, [users]);
     *
     * @example
     * // With geolocation
     * const location = useComputed('location', async () => {
     *   const pos = await new Promise((resolve) => {
     *     navigator.geolocation.getCurrentPosition(resolve);
     *   });
     *   return { lat: pos.coords.latitude, lng: pos.coords.longitude };
     * }, []);
     *
     * @example
     * // With memoization and expiry
     * const result = useComputed('result', () => compute(data), [data], {
     *   memoize: true,
     *   expiry: 5000  // Cache for 5 seconds
     * });
     */
    function useComputed(key, computeFn, deps = [], options = {}) {
        if (!currentContext$2) {
            throw new Error('[Minimact] useComputed must be called within a component render');
        }
        const { memoize = true, // Default to true for performance
        expiry, debounce, throttle, initialValue } = options;
        const context = currentContext$2;
        // Store computed value in state
        const [value, setValue] = useState(initialValue !== undefined ? initialValue : null);
        // Cache for memoization
        const cache = useRef(null);
        // Debounce timer ref
        const debounceTimer = useRef(null);
        useEffect(() => {
            // Check if we should use cached value
            if (memoize && cache.current) {
                // Check if deps changed
                const depsChanged = deps.length !== cache.current.deps.length ||
                    deps.some((dep, i) => !Object.is(dep, cache.current.deps[i]));
                if (!depsChanged) {
                    // Deps haven't changed
                    if (expiry) {
                        // Check if cache expired
                        const age = Date.now() - cache.current.timestamp;
                        if (age < expiry) {
                            // Cache is still valid, use cached value
                            return;
                        }
                        // Cache expired, continue to recompute
                    }
                    else {
                        // No expiry, use cached value indefinitely
                        return;
                    }
                }
                // Deps changed, continue to recompute
            }
            // Compute new value
            let computed;
            try {
                computed = computeFn();
            }
            catch (error) {
                console.error(`[Minimact] Error in useComputed('${key}'):`, error);
                throw error;
            }
            // Handle async computations
            if (computed instanceof Promise) {
                computed.then((resolvedValue) => {
                    // Update cache if memoization enabled
                    if (memoize) {
                        cache.current = {
                            value: resolvedValue,
                            timestamp: Date.now(),
                            deps: [...deps]
                        };
                    }
                    // Update local state
                    setValue(resolvedValue);
                    // Sync to server
                    syncToServer(resolvedValue);
                }).catch((error) => {
                    console.error(`[Minimact] Async error in useComputed('${key}'):`, error);
                });
                return; // Don't sync yet, wait for promise to resolve
            }
            // Update cache if memoization enabled
            if (memoize) {
                cache.current = {
                    value: computed,
                    timestamp: Date.now(),
                    deps: [...deps]
                };
            }
            // Update local state
            setValue(computed);
            // Sync to server
            syncToServer(computed);
        }, deps);
        /**
         * Sync computed value to server via SignalR
         */
        function syncToServer(computedValue) {
            const doSync = () => {
                if (!context.signalR) {
                    console.warn(`[Minimact] SignalR not available, cannot sync useComputed('${key}')`);
                    return;
                }
                context.signalR.updateClientComputedState(context.componentId, { [key]: computedValue })
                    .catch(err => {
                    console.error(`[Minimact] Failed to sync computed state '${key}':`, err);
                });
            };
            // Apply debounce if specified
            if (debounce) {
                if (debounceTimer.current !== null) {
                    clearTimeout(debounceTimer.current);
                }
                debounceTimer.current = window.setTimeout(() => {
                    doSync();
                    debounceTimer.current = null;
                }, debounce);
                return;
            }
            // TODO: Implement throttle
            if (throttle) {
                // For now, just sync immediately
                // Proper throttle implementation would track last sync time
                doSync();
                return;
            }
            // No debounce/throttle, sync immediately
            doSync();
        }
        return value;
    }

    // Global context tracking
    let currentContext$1 = null;
    let stateIndex = 0;
    let effectIndex = 0;
    let refIndex = 0;
    let serverTaskIndex = 0;
    /**
     * Set the current component context (called before render)
     */
    function setComponentContext(context) {
        currentContext$1 = context;
        stateIndex = 0;
        effectIndex = 0;
        refIndex = 0;
        serverTaskIndex = 0;
        // Reset computed index for useComputed hook
        setComputedContext(context);
    }
    /**
     * Clear the current component context (called after render)
     */
    function clearComponentContext() {
        currentContext$1 = null;
    }
    /**
     * Find DOM element by path array
     * Example: [0, 1, 0] → first child, second child, first child
     */
    function findElementByPath(root, path) {
        let current = root;
        for (const index of path) {
            if (!current || !current.childNodes)
                return null;
            current = current.childNodes[index] || null;
        }
        return current;
    }
    /**
     * useState hook - manages component state with hint queue integration
     */
    function useState(initialValue) {
        if (!currentContext$1) {
            throw new Error('useState must be called within a component render');
        }
        const context = currentContext$1;
        const index = stateIndex++;
        const stateKey = `state_${index}`;
        // Initialize state if not exists
        if (!context.state.has(stateKey)) {
            context.state.set(stateKey, initialValue);
        }
        const currentValue = context.state.get(stateKey);
        const setState = (newValue) => {
            const startTime = performance.now();
            const actualNewValue = typeof newValue === 'function'
                ? newValue(context.state.get(stateKey))
                : newValue;
            // Build state change object for hint matching
            const stateChanges = {
                [stateKey]: actualNewValue
            };
            // Check hint queue for match
            const hint = context.hintQueue.matchHint(context.componentId, stateChanges);
            if (hint) {
                // 🟢 CACHE HIT! Apply queued patches immediately
                const latency = performance.now() - startTime;
                console.log(`[Minimact] 🟢 CACHE HIT! Hint '${hint.hintId}' matched - applying ${hint.patches.length} patches in ${latency.toFixed(2)}ms`);
                context.domPatcher.applyPatches(context.element, hint.patches);
                // Notify playground of cache hit
                if (context.playgroundBridge) {
                    context.playgroundBridge.cacheHit({
                        componentId: context.componentId,
                        hintId: hint.hintId,
                        latency,
                        confidence: hint.confidence,
                        patchCount: hint.patches.length
                    });
                }
            }
            else {
                // 🔴 CACHE MISS - No prediction found
                const latency = performance.now() - startTime;
                console.log(`[Minimact] 🔴 CACHE MISS - No prediction for state change:`, stateChanges);
                // Notify playground of cache miss
                if (context.playgroundBridge) {
                    context.playgroundBridge.cacheMiss({
                        componentId: context.componentId,
                        methodName: `setState(${stateKey})`,
                        latency,
                        patchCount: 0
                    });
                }
            }
            // Update state
            context.state.set(stateKey, actualNewValue);
            // Update template state for template rendering
            templateState.updateState(context.componentId, stateKey, actualNewValue);
            // Re-render templates bound to this state
            const boundTemplates = templateState.getTemplatesBoundTo(context.componentId, stateKey);
            for (const template of boundTemplates) {
                // Build node path from template path array
                const nodePath = template.path.join('_');
                // Render template with new value
                const newText = templateState.render(context.componentId, nodePath);
                if (newText !== null) {
                    // Find DOM element by path and update it
                    const element = findElementByPath(context.element, template.path);
                    if (element) {
                        if (element.nodeType === Node.TEXT_NODE) {
                            element.textContent = newText;
                        }
                        else if (element instanceof HTMLElement) {
                            // For attribute templates
                            if (template.attribute) {
                                element.setAttribute(template.attribute, newText);
                            }
                            else {
                                element.textContent = newText;
                            }
                        }
                        console.log(`[Minimact] 📋 Template updated: "${newText}" (${stateKey} changed)`);
                    }
                }
            }
            // Sync state to server to prevent stale data
            context.signalR.updateComponentState(context.componentId, stateKey, actualNewValue)
                .catch(err => {
                console.error('[Minimact] Failed to sync state to server:', err);
            });
        };
        // If value is an array, add array helpers
        if (Array.isArray(currentValue)) {
            return [currentValue, createArrayStateSetter(setState, currentValue, stateKey, context)];
        }
        return [currentValue, setState];
    }
    /**
     * useEffect hook - runs side effects after render
     */
    function useEffect(callback, deps) {
        if (!currentContext$1) {
            throw new Error('useEffect must be called within a component render');
        }
        const context = currentContext$1;
        const index = effectIndex++;
        // Get or create effect entry
        if (!context.effects[index]) {
            context.effects[index] = {
                callback,
                deps,
                cleanup: undefined
            };
            // Run effect after render
            queueMicrotask(() => {
                const cleanup = callback();
                if (typeof cleanup === 'function') {
                    context.effects[index].cleanup = cleanup;
                }
            });
        }
        else {
            const effect = context.effects[index];
            // Check if deps changed
            const depsChanged = !deps || !effect.deps ||
                deps.length !== effect.deps.length ||
                deps.some((dep, i) => dep !== effect.deps[i]);
            if (depsChanged) {
                // Run cleanup if exists
                if (effect.cleanup) {
                    effect.cleanup();
                }
                // Update effect
                effect.callback = callback;
                effect.deps = deps;
                // Run new effect
                queueMicrotask(() => {
                    const cleanup = callback();
                    if (typeof cleanup === 'function') {
                        effect.cleanup = cleanup;
                    }
                });
            }
        }
    }
    /**
     * useRef hook - creates a mutable ref object
     */
    function useRef(initialValue) {
        if (!currentContext$1) {
            throw new Error('useRef must be called within a component render');
        }
        const context = currentContext$1;
        const index = refIndex++;
        const refKey = `ref_${index}`;
        // Initialize ref if not exists
        if (!context.refs.has(refKey)) {
            context.refs.set(refKey, { current: initialValue });
        }
        return context.refs.get(refKey);
    }
    /**
     * Create array state setter with semantic helper methods
     */
    function createArrayStateSetter(baseSetState, currentArray, stateKey, context) {
        // Base setter function
        const setter = baseSetState;
        // Append helper
        setter.append = (item) => {
            const newArray = [...currentArray, item];
            // Update local state
            context.state.set(stateKey, newArray);
            // Update template state
            templateState.updateState(context.componentId, stateKey, newArray);
            // Notify server of APPEND operation (not just new array)
            context.signalR.updateComponentStateWithOperation(context.componentId, stateKey, newArray, { type: 'Append', item }).catch(err => {
                console.error('[Minimact] Failed to sync array append to server:', err);
            });
            // TODO: Try to predict patch using loop template
            console.log(`[Minimact] 🔵 Array append: ${stateKey}`, item);
        };
        // Prepend helper
        setter.prepend = (item) => {
            const newArray = [item, ...currentArray];
            context.state.set(stateKey, newArray);
            templateState.updateState(context.componentId, stateKey, newArray);
            context.signalR.updateComponentStateWithOperation(context.componentId, stateKey, newArray, { type: 'Prepend', item }).catch(err => {
                console.error('[Minimact] Failed to sync array prepend to server:', err);
            });
            console.log(`[Minimact] 🔵 Array prepend: ${stateKey}`, item);
        };
        // InsertAt helper
        setter.insertAt = (index, item) => {
            const newArray = [...currentArray];
            newArray.splice(index, 0, item);
            context.state.set(stateKey, newArray);
            templateState.updateState(context.componentId, stateKey, newArray);
            context.signalR.updateComponentStateWithOperation(context.componentId, stateKey, newArray, { type: 'InsertAt', index, item }).catch(err => {
                console.error('[Minimact] Failed to sync array insert to server:', err);
            });
            console.log(`[Minimact] 🔵 Array insertAt(${index}): ${stateKey}`, item);
        };
        // RemoveAt helper
        setter.removeAt = (index) => {
            const newArray = currentArray.filter((_, i) => i !== index);
            context.state.set(stateKey, newArray);
            templateState.updateState(context.componentId, stateKey, newArray);
            context.signalR.updateComponentStateWithOperation(context.componentId, stateKey, newArray, { type: 'RemoveAt', index }).catch(err => {
                console.error('[Minimact] Failed to sync array remove to server:', err);
            });
            console.log(`[Minimact] 🔵 Array removeAt(${index}): ${stateKey}`);
        };
        // UpdateAt helper
        setter.updateAt = (index, updates) => {
            const newArray = [...currentArray];
            newArray[index] = typeof updates === 'function'
                ? updates(currentArray[index])
                : { ...currentArray[index], ...updates };
            context.state.set(stateKey, newArray);
            templateState.updateState(context.componentId, stateKey, newArray);
            context.signalR.updateComponentStateWithOperation(context.componentId, stateKey, newArray, { type: 'UpdateAt', index, item: newArray[index] }).catch(err => {
                console.error('[Minimact] Failed to sync array update to server:', err);
            });
            console.log(`[Minimact] 🔵 Array updateAt(${index}): ${stateKey}`, newArray[index]);
        };
        // Clear helper
        setter.clear = () => {
            baseSetState([]);
        };
        // RemoveWhere helper
        setter.removeWhere = (predicate) => {
            const newArray = currentArray.filter(item => !predicate(item));
            baseSetState(newArray);
        };
        // UpdateWhere helper
        setter.updateWhere = (predicate, updates) => {
            const newArray = currentArray.map(item => predicate(item) ? { ...item, ...updates } : item);
            baseSetState(newArray);
        };
        // AppendMany helper
        setter.appendMany = (items) => {
            const newArray = [...currentArray, ...items];
            baseSetState(newArray);
        };
        // RemoveMany helper
        setter.removeMany = (indices) => {
            const newArray = currentArray.filter((_, i) => !indices.includes(i));
            baseSetState(newArray);
        };
        return setter;
    }
    /**
     * useServerTask - Execute long-running operations on the server with reactive client state
     *
     * @param taskFactory - Optional async function (will be transpiled to C# by Babel plugin)
     * @param options - Configuration options for the server task
     * @returns ServerTask interface with status, result, and control methods
     *
     * @example
     * const analysis = useServerTask(async () => {
     *   // This code runs on the SERVER (transpiled to C#)
     *   const data = await fetchData();
     *   return processData(data);
     * });
     *
     * // In JSX:
     * <button onClick={analysis.start}>Start</button>
     * {analysis.running && <Spinner />}
     * {analysis.complete && <div>{analysis.result}</div>}
     */
    function useServerTask(taskFactory, options = {}) {
        if (!currentContext$1) {
            throw new Error('useServerTask must be called within a component render');
        }
        const context = currentContext$1;
        const index = serverTaskIndex++;
        const taskKey = `serverTask_${index}`;
        // Initialize serverTasks map if not exists
        if (!context.serverTasks) {
            context.serverTasks = new Map();
        }
        // Get or create server task instance
        if (!context.serverTasks.has(taskKey)) {
            const task = new ServerTaskImpl(taskKey, context.componentId, context.signalR, context, options);
            context.serverTasks.set(taskKey, task);
        }
        return context.serverTasks.get(taskKey);
    }

    /**
     * useContext - Server-side cache system with multiple scope types
     *
     * This reimagines React's context API as a Redis-like in-memory cache
     * that enables shared state across components with flexible lifetime management.
     */
    let currentContext = null;
    /**
     * Set the current component context for hook execution
     * Called internally by Minimact before rendering
     */
    function setContextHookContext(context) {
        currentContext = context;
    }
    /**
     * Clear the current component context after rendering
     * Called internally by Minimact after rendering
     */
    function clearContextHookContext() {
        currentContext = null;
    }
    /**
     * Create a context with specified scope and options
     *
     * @example
     * // Session-scoped user context
     * const UserContext = createContext<User>('current-user', {
     *   scope: 'session',
     *   expiry: 3600000 // 1 hour
     * });
     *
     * @example
     * // URL-scoped dashboard filters
     * const DashboardFilters = createContext<Filters>('dashboard-filters', {
     *   scope: 'url',
     *   urlPattern: '/dashboard/*',
     *   expiry: 3600000
     * });
     */
    function createContext(key, options = {}) {
        // Validate URL pattern if scope is 'url'
        if (options.scope === 'url' && !options.urlPattern) {
            throw new Error(`Context '${key}' with scope 'url' requires urlPattern`);
        }
        return {
            key,
            options: {
                scope: options.scope || 'request',
                urlPattern: options.urlPattern,
                expiry: options.expiry,
                defaultValue: options.defaultValue
            }
        };
    }
    /**
     * Use a context - returns [value, setValue, clearValue]
     *
     * Unlike React's useContext, this doesn't require a Provider component.
     * The context is stored server-side in a cache with the specified scope.
     *
     * @returns Tuple of [value, setValue, clearValue]
     *
     * @example
     * // Read and write to context
     * function LoginForm() {
     *   const [_, setUser] = useContext(UserContext);
     *
     *   const handleLogin = async (credentials) => {
     *     const user = await authenticate(credentials);
     *     setUser(user); // Stored in session-scoped cache
     *   };
     *
     *   return <form onSubmit={handleLogin}>...</form>;
     * }
     *
     * @example
     * // Read from context (different component, no parent-child relationship needed)
     * function UserProfile() {
     *   const [user] = useContext(UserContext);
     *
     *   if (!user) return <Login />;
     *   return <div>Welcome, {user.name}</div>;
     * }
     */
    function useContext(context) {
        if (!currentContext) {
            throw new Error('[Minimact] useContext must be called within a component render');
        }
        const ctx = currentContext;
        const stateKey = `context_${context.key}`;
        // Get current value from component state (initialized from server)
        let currentValue = ctx.state.get(stateKey);
        // If no value and has default, use default
        if (currentValue === undefined && context.options.defaultValue !== undefined) {
            currentValue = context.options.defaultValue;
        }
        // Setter - updates local state and syncs to server
        const setContextValue = (newValue) => {
            // Update local state immediately for instant feedback
            ctx.state.set(stateKey, newValue);
            // Apply any cached patches if available
            const stateChanges = {
                [stateKey]: newValue
            };
            const hint = ctx.hintQueue.matchHint(ctx.componentId, stateChanges);
            if (hint) {
                ctx.domPatcher.applyPatches(ctx.element, hint.patches);
            }
            // Sync to server cache
            ctx.signalR.invoke('UpdateContext', {
                key: context.key,
                value: newValue,
                scope: context.options.scope,
                urlPattern: context.options.urlPattern,
                expiry: context.options.expiry
            }).catch(err => {
                console.error(`[Minimact] Failed to update context '${context.key}':`, err);
            });
        };
        // Clear - removes value from cache
        const clearContextValue = () => {
            // Clear local state
            ctx.state.set(stateKey, undefined);
            // Apply any cached patches if available
            const stateChanges = {
                [stateKey]: undefined
            };
            const hint = ctx.hintQueue.matchHint(ctx.componentId, stateChanges);
            if (hint) {
                ctx.domPatcher.applyPatches(ctx.element, hint.patches);
            }
            // Sync to server cache
            ctx.signalR.invoke('ClearContext', {
                key: context.key,
                scope: context.options.scope,
                urlPattern: context.options.urlPattern
            }).catch(err => {
                console.error(`[Minimact] Failed to clear context '${context.key}':`, err);
            });
        };
        return [currentValue, setContextValue, clearContextValue];
    }

    /**
     * usePaginatedServerTask - Pagination built on useServerTask
     *
     * Extends the existing useServerTask infrastructure to add pagination capabilities.
     * Reuses transpilers, FFI bridge, and task runtime for zero additional complexity.
     */
    /**
     * usePaginatedServerTask Hook
     *
     * Wraps useServerTask to provide pagination with intelligent prefetching.
     *
     * @example
     * const users = usePaginatedServerTask(
     *   async ({ page, pageSize, filters }) => {
     *     return await db.users
     *       .where(u => filters.role ? u.role === filters.role : true)
     *       .skip((page - 1) * pageSize)
     *       .take(pageSize)
     *       .toList();
     *   },
     *   {
     *     pageSize: 20,
     *     getTotalCount: async (filters) => {
     *       return await db.users
     *         .where(u => filters.role ? u.role === filters.role : true)
     *         .count();
     *     },
     *     prefetchNext: true,
     *     dependencies: [filters]
     *   }
     * );
     */
    function usePaginatedServerTask(fetchFn, options) {
        const pageSize = options.pageSize || 20;
        // State
        const [page, setPage] = useState(1);
        const [items, setItems] = useState([]);
        const [total, setTotal] = useState(0);
        const [error, setError] = useState(null);
        // Prefetch cache
        const prefetchCache = useRef(new Map());
        // Last args (for retry)
        const lastArgs = useRef([]);
        // Build current filters from dependencies
        const filters = buildFilters(options.dependencies);
        // ✅ Reuse useServerTask for fetch logic!
        // Note: The actual function is passed via Babel transpilation
        // At runtime, we just get a task instance and call .start(args)
        const fetchTask = useServerTask(undefined, // Function extracted by Babel plugin
        {
            runtime: options.runtime,
            parallel: options.parallel
        });
        // ✅ Reuse useServerTask for count query!
        const countTask = useServerTask(undefined, // Function extracted by Babel plugin
        { runtime: options.runtime });
        /**
         * Fetch a specific page
         */
        const fetchPage = async (targetPage, fromCache = true) => {
            // Check prefetch cache
            if (fromCache && prefetchCache.current.has(targetPage)) {
                const cached = prefetchCache.current.get(targetPage);
                setItems(cached);
                setPage(targetPage);
                prefetchCache.current.delete(targetPage);
                console.log(`[usePaginatedServerTask] 🟢 Cache hit for page ${targetPage}`);
                // Trigger next prefetch
                if (options.prefetchNext && targetPage < totalPages) {
                    prefetchInBackground(targetPage + 1);
                }
                if (options.prefetchPrev && targetPage > 1) {
                    prefetchInBackground(targetPage - 1);
                }
                return;
            }
            // Fetch from server via useServerTask
            const args = {
                page: targetPage,
                pageSize,
                filters
            };
            lastArgs.current = [args];
            fetchTask.start(args);
            // Wait for completion (using promise)
            try {
                const result = await fetchTask.promise;
                setItems(result);
                setPage(targetPage);
                setError(null);
                console.log(`[usePaginatedServerTask] 🔴 Fetched page ${targetPage} from server`);
                // Prefetch adjacent pages if configured
                if (options.prefetchNext && targetPage < totalPages) {
                    prefetchInBackground(targetPage + 1);
                }
                if (options.prefetchPrev && targetPage > 1) {
                    prefetchInBackground(targetPage - 1);
                }
            }
            catch (err) {
                setError(err.message || 'Failed to fetch page');
                console.error(`[usePaginatedServerTask] Error fetching page ${targetPage}:`, err);
            }
        };
        /**
         * Prefetch in background (non-blocking)
         */
        const prefetchInBackground = async (targetPage) => {
            if (prefetchCache.current.has(targetPage)) {
                return; // Already cached
            }
            const args = {
                page: targetPage,
                pageSize,
                filters
            };
            // Create a separate task instance for prefetching
            // Note: This will be optimized later to reuse task instances
            fetchTask.start(args);
            try {
                const result = await fetchTask.promise;
                prefetchCache.current.set(targetPage, result);
                console.log(`[usePaginatedServerTask] ⚡ Prefetched page ${targetPage}`);
            }
            catch (err) {
                console.error(`[usePaginatedServerTask] Prefetch failed for page ${targetPage}:`, err);
                // Silently fail - prefetch is optional
            }
        };
        /**
         * Get total count on mount and when filters change
         */
        useEffect(() => {
            countTask.start(filters);
            countTask.promise.then((count) => {
                setTotal(count);
            }).catch((err) => {
                console.error('[usePaginatedServerTask] Failed to get total count:', err);
            });
        }, [JSON.stringify(filters)]);
        /**
         * Initial fetch
         */
        useEffect(() => {
            fetchPage(1, false);
        }, []);
        /**
         * Re-fetch when dependencies change
         */
        useEffect(() => {
            if (options.dependencies && options.dependencies.length > 0) {
                prefetchCache.current.clear();
                fetchPage(1, false);
            }
        }, [JSON.stringify(filters)]);
        // Computed properties
        const totalPages = Math.ceil(total / pageSize);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;
        // Navigation methods
        const next = () => {
            if (hasNext) {
                fetchPage(page + 1);
            }
        };
        const prev = () => {
            if (hasPrev) {
                fetchPage(page - 1);
            }
        };
        const goto = (targetPage) => {
            if (targetPage >= 1 && targetPage <= totalPages) {
                fetchPage(targetPage);
            }
        };
        const refresh = () => {
            prefetchCache.current.clear();
            fetchPage(page, false);
        };
        return {
            // Data
            items,
            total,
            totalPages,
            // State
            page,
            pageSize,
            pending: fetchTask.status === 'running',
            error: error || fetchTask.error?.message,
            // Navigation
            hasNext,
            hasPrev,
            next,
            prev,
            goto,
            refresh,
            // ✅ Expose underlying tasks for advanced use
            _fetchTask: fetchTask,
            _countTask: countTask
        };
    }
    /**
     * Helper: Build filters object from dependencies array
     */
    function buildFilters(dependencies) {
        if (!dependencies || dependencies.length === 0) {
            return {};
        }
        // If single object, use as-is
        if (dependencies.length === 1 && typeof dependencies[0] === 'object') {
            return dependencies[0];
        }
        // Otherwise, create indexed object
        return dependencies.reduce((acc, dep, i) => {
            acc[`dep${i}`] = dep;
            return acc;
        }, {});
    }

    /**
     * Client-side pub/sub event aggregator
     * Enables component-to-component communication without prop drilling
     */
    /**
     * Global event aggregator for client-side pub/sub
     */
    class EventAggregator {
        constructor(options = {}) {
            this.channels = new Map();
            this.debugLogging = false;
            this.debugLogging = options.debugLogging || false;
        }
        /**
         * Subscribe to a channel
         */
        subscribe(channel, callback) {
            if (!this.channels.has(channel)) {
                this.channels.set(channel, {
                    subscribers: new Set(),
                    lastMessage: null
                });
            }
            const channelData = this.channels.get(channel);
            // Add callback if provided
            if (callback) {
                channelData.subscribers.add(callback);
            }
            // Return reactive message object
            const message = channelData.lastMessage || {
                value: undefined,
                timestamp: Date.now()
            };
            this.log(`Subscribed to '${channel}'`, { hasCallback: !!callback });
            return message;
        }
        /**
         * Unsubscribe from a channel
         */
        unsubscribe(channel, callback) {
            const channelData = this.channels.get(channel);
            if (channelData) {
                channelData.subscribers.delete(callback);
                this.log(`Unsubscribed from '${channel}'`);
            }
        }
        /**
         * Publish a message to a channel
         */
        publish(channel, value, options = {}) {
            if (!this.channels.has(channel)) {
                this.channels.set(channel, {
                    subscribers: new Set(),
                    lastMessage: null
                });
            }
            const channelData = this.channels.get(channel);
            const message = {
                value,
                error: options.error,
                waiting: options.waiting,
                source: options.source,
                timestamp: Date.now(),
                isStale: false
            };
            // Update last message
            channelData.lastMessage = message;
            // Notify all subscribers
            channelData.subscribers.forEach(subscriber => {
                try {
                    subscriber(message);
                }
                catch (error) {
                    console.error(`[Minimact PubSub] Error in subscriber for '${channel}':`, error);
                }
            });
            this.log(`Published to '${channel}'`, {
                subscribers: channelData.subscribers.size,
                value
            });
        }
        /**
         * Clear a channel
         */
        clear(channel) {
            this.channels.delete(channel);
            this.log(`Cleared channel '${channel}'`);
        }
        /**
         * Clear all channels
         */
        clearAll() {
            this.channels.clear();
            this.log('Cleared all channels');
        }
        /**
         * Get stats
         */
        getStats() {
            return {
                totalChannels: this.channels.size,
                channels: Array.from(this.channels.entries()).map(([name, data]) => ({
                    name,
                    subscribers: data.subscribers.size,
                    hasLastMessage: !!data.lastMessage
                }))
            };
        }
        log(message, data) {
            if (this.debugLogging) {
                console.log(`[Minimact PubSub] ${message}`, data || '');
            }
        }
    }
    // Global singleton instance
    let globalAggregator = null;
    function getEventAggregator(options) {
        if (!globalAggregator) {
            globalAggregator = new EventAggregator(options);
        }
        return globalAggregator;
    }
    /**
     * Hook: usePub - Publish to a channel
     */
    function usePub(channel) {
        const aggregator = getEventAggregator();
        return (value, options = {}) => {
            aggregator.publish(channel, value, options);
        };
    }
    /**
     * Hook: useSub - Subscribe to a channel
     */
    function useSub(channel, callback) {
        const aggregator = getEventAggregator();
        // Subscribe and return reactive message object
        const message = aggregator.subscribe(channel, callback);
        // TODO: Integrate with component lifecycle for auto-unsubscribe
        // For now, developers must manually unsubscribe or we rely on component unmount
        return message;
    }

    /**
     * Task scheduling hooks for fine-grained render timing control
     * useMicroTask - runs before paint (microtask queue)
     * useMacroTask - runs after paint (task queue)
     */
    /**
     * Hook: useMicroTask
     * Schedules a callback to run in the microtask queue (before next paint)
     * Perfect for: DOM measurements, layout calculations, critical updates
     */
    function useMicroTask(callback) {
        queueMicrotask(() => {
            try {
                callback();
            }
            catch (error) {
                console.error('[Minimact useMicroTask] Error in microtask:', error);
            }
        });
    }
    /**
     * Hook: useMacroTask
     * Schedules a callback to run in the task queue (after paint)
     * Perfect for: Analytics, logging, non-critical updates, deferred work
     */
    function useMacroTask(callback, delay = 0) {
        setTimeout(() => {
            try {
                callback();
            }
            catch (error) {
                console.error('[Minimact useMacroTask] Error in macrotask:', error);
            }
        }, delay);
    }
    /**
     * Hook: useAnimationFrame
     * Schedules a callback for the next animation frame
     * Perfect for: Animations, visual updates, smooth transitions
     */
    function useAnimationFrame(callback) {
        const rafId = requestAnimationFrame((timestamp) => {
            try {
                callback(timestamp);
            }
            catch (error) {
                console.error('[Minimact useAnimationFrame] Error in animation frame:', error);
            }
        });
        return rafId;
    }
    /**
     * Hook: useIdleCallback
     * Schedules a callback for when the browser is idle
     * Perfect for: Low-priority work, background tasks, optimization
     */
    function useIdleCallback(callback, options) {
        if ('requestIdleCallback' in window) {
            return requestIdleCallback((deadline) => {
                try {
                    callback(deadline);
                }
                catch (error) {
                    console.error('[Minimact useIdleCallback] Error in idle callback:', error);
                }
            }, options);
        }
        else {
            // Fallback to setTimeout for browsers without requestIdleCallback
            return setTimeout(() => {
                const deadline = {
                    didTimeout: false,
                    timeRemaining: () => 50
                };
                callback(deadline);
            }, 1);
        }
    }

    /**
     * Hook: useSignalR
     * Connects to a SignalR hub and provides real-time updates
     *
     * Usage:
     * const notifications = useSignalR('/hubs/notifications', (message) => {
     *   console.log('New notification:', message);
     * });
     */
    function useSignalR(hubUrl, onMessage, options = {}) {
        // Create SignalR manager for this hub
        const manager = new SignalRManager(hubUrl, {
            reconnectInterval: options.reconnectInterval,
            debugLogging: options.debugLogging
        });
        // Initialize state
        const state = {
            data: null,
            error: null,
            connected: false,
            connectionId: null
        };
        // Setup event handlers
        manager.on('connected', ({ connectionId }) => {
            state.connected = true;
            state.connectionId = connectionId || null;
            state.error = null;
        });
        manager.on('reconnected', ({ connectionId }) => {
            state.connected = true;
            state.connectionId = connectionId || null;
            state.error = null;
        });
        manager.on('closed', ({ error }) => {
            state.connected = false;
            state.connectionId = null;
            if (error) {
                state.error = error.toString();
            }
        });
        manager.on('error', ({ message }) => {
            state.error = message;
        });
        // Setup message handler if provided
        if (onMessage) {
            manager.on('message', (data) => {
                state.data = data;
                onMessage(data);
            });
        }
        // Auto-connect if enabled (default: true)
        if (options.autoConnect !== false) {
            manager.start().catch(error => {
                state.error = error.message;
                console.error('[Minimact useSignalR] Auto-connect failed:', error);
            });
        }
        return {
            state,
            send: async (methodName, ...args) => {
                try {
                    await manager.connection.invoke(methodName, ...args);
                }
                catch (error) {
                    state.error = error.message;
                    throw error;
                }
            },
            on: (methodName, handler) => {
                manager.connection.on(methodName, handler);
            },
            off: (methodName, handler) => {
                manager.connection.off(methodName, handler);
            },
            connect: async () => {
                await manager.start();
            },
            disconnect: async () => {
                await manager.stop();
            }
        };
    }

    /**
     * Main Minimact client runtime
     * Orchestrates SignalR, DOM patching, state management, and hydration
     */
    class Minimact {
        constructor(rootElement = document.body, options = {}) {
            this.eventDelegation = null;
            // Resolve root element
            if (typeof rootElement === 'string') {
                const element = document.querySelector(rootElement);
                if (!element) {
                    throw new Error(`[Minimact] Root element not found: ${rootElement}`);
                }
                this.rootElement = element;
            }
            else {
                this.rootElement = rootElement;
            }
            // Default options
            this.options = {
                hubUrl: options.hubUrl || '/minimact',
                enableDebugLogging: options.enableDebugLogging || false,
                reconnectInterval: options.reconnectInterval || 5000
            };
            // Initialize subsystems
            this.signalR = new SignalRManager(this.options.hubUrl, {
                reconnectInterval: this.options.reconnectInterval,
                debugLogging: this.options.enableDebugLogging
            });
            this.domPatcher = new DOMPatcher({
                debugLogging: this.options.enableDebugLogging
            });
            this.clientState = new ClientStateManager({
                debugLogging: this.options.enableDebugLogging
            });
            this.hydration = new HydrationManager(this.clientState, {
                debugLogging: this.options.enableDebugLogging
            });
            this.hintQueue = new HintQueue({
                debugLogging: this.options.enableDebugLogging
            });
            this.playgroundBridge = new PlaygroundBridge({
                debugLogging: this.options.enableDebugLogging
            });
            // Enable debug logging for client-computed module
            setDebugLogging(this.options.enableDebugLogging);
            this.setupSignalRHandlers();
            this.log('Minimact initialized', { rootElement: this.rootElement, options: this.options });
        }
        /**
         * Start the Minimact runtime
         */
        async start() {
            // Connect to SignalR hub
            await this.signalR.start();
            // Hydrate all components
            this.hydration.hydrateAll();
            // Setup event delegation
            this.eventDelegation = new EventDelegation(this.rootElement, (componentId, methodName, args) => this.signalR.invokeComponentMethod(componentId, methodName, args), { debugLogging: this.options.enableDebugLogging });
            // Register all components with server
            await this.registerAllComponents();
            this.log('Minimact started');
        }
        /**
         * Stop the Minimact runtime
         */
        async stop() {
            if (this.eventDelegation) {
                this.eventDelegation.destroy();
                this.eventDelegation = null;
            }
            await this.signalR.stop();
            this.log('Minimact stopped');
        }
        /**
         * Setup SignalR event handlers
         */
        setupSignalRHandlers() {
            // Handle full HTML updates
            this.signalR.on('updateComponent', ({ componentId, html }) => {
                const component = this.hydration.getComponent(componentId);
                if (component) {
                    this.domPatcher.replaceHTML(component.element, html);
                    this.log('Component HTML updated', { componentId });
                }
            });
            // Handle patch updates
            this.signalR.on('applyPatches', ({ componentId, patches }) => {
                const component = this.hydration.getComponent(componentId);
                if (component) {
                    this.domPatcher.applyPatches(component.element, patches);
                    this.log('Patches applied', { componentId, patchCount: patches.length });
                }
            });
            // Handle predicted patches (instant UI updates!)
            this.signalR.on('applyPrediction', ({ componentId, patches, confidence }) => {
                const component = this.hydration.getComponent(componentId);
                if (component) {
                    this.domPatcher.applyPatches(component.element, patches);
                    this.log(`Prediction applied (${(confidence * 100).toFixed(0)}% confident)`, { componentId, patchCount: patches.length });
                }
            });
            // Handle corrections if prediction was wrong
            this.signalR.on('applyCorrection', ({ componentId, patches }) => {
                const component = this.hydration.getComponent(componentId);
                if (component) {
                    this.domPatcher.applyPatches(component.element, patches);
                    this.log('Correction applied (prediction was incorrect)', { componentId, patchCount: patches.length });
                }
            });
            // Handle hint queueing (usePredictHint)
            this.signalR.on('queueHint', (data) => {
                this.hintQueue.queueHint(data);
                this.log(`Hint '${data.hintId}' queued for component ${data.componentId}`, {
                    patchCount: data.patches.length,
                    confidence: (data.confidence * 100).toFixed(0) + '%'
                });
                // Notify playground that prediction was received
                this.playgroundBridge.predictionReceived({
                    componentId: data.componentId,
                    hintId: data.hintId,
                    patchCount: data.patches.length,
                    confidence: data.confidence
                });
            });
            // Handle reconnection
            this.signalR.on('reconnected', async () => {
                this.log('Reconnected - re-registering components');
                await this.registerAllComponents();
            });
            // Handle errors
            this.signalR.on('error', ({ message }) => {
                console.error('[Minimact] Server error:', message);
            });
        }
        /**
         * Register all components with the server
         */
        async registerAllComponents() {
            const components = document.querySelectorAll('[data-minimact-component]');
            for (const element of Array.from(components)) {
                const componentId = element.getAttribute('data-minimact-component');
                if (componentId) {
                    try {
                        await this.signalR.registerComponent(componentId);
                        this.log('Registered component', { componentId });
                    }
                    catch (error) {
                        console.error('[Minimact] Failed to register component:', componentId, error);
                    }
                }
            }
        }
        /**
         * Manually hydrate a component
         */
        hydrateComponent(componentId, element) {
            this.hydration.hydrateComponent(componentId, element);
        }
        /**
         * Get component by ID (for hot reload)
         */
        getComponent(componentId) {
            return this.hydration.getComponent(componentId);
        }
        /**
         * Get client state for a component
         */
        getClientState(componentId, key) {
            return this.clientState.getState(componentId, key);
        }
        /**
         * Set client state for a component
         */
        setClientState(componentId, key, value) {
            this.clientState.setState(componentId, key, value);
            // Recompute client-computed variables that depend on this state
            this.recomputeAndSyncClientState(componentId, key);
        }
        /**
         * Subscribe to client state changes
         */
        subscribeToState(componentId, key, callback) {
            return this.clientState.subscribe(componentId, key, callback);
        }
        /**
         * Recompute client-computed variables after state change and sync to server
         */
        async recomputeAndSyncClientState(componentId, changedStateKey) {
            // Check if component has any client-computed variables
            if (!hasClientComputed(componentId)) {
                return;
            }
            // Compute affected variables
            const computed = changedStateKey
                ? computeDependentVariables(componentId, changedStateKey)
                : computeAllForComponent(componentId);
            // If there are computed values, send to server
            if (Object.keys(computed).length > 0) {
                try {
                    await this.signalR.updateClientComputedState(componentId, computed);
                    this.log('Client-computed state synced', { componentId, computed });
                }
                catch (error) {
                    console.error('[Minimact] Failed to sync client-computed state:', error);
                }
            }
        }
        /**
         * Get SignalR connection state
         */
        get connectionState() {
            return this.signalR.state.toString();
        }
        /**
         * Get SignalR connection ID
         */
        get connectionId() {
            return this.signalR.connectionId;
        }
        /**
         * Debug logging
         */
        log(message, data) {
            if (this.options.enableDebugLogging) {
                console.log(`[Minimact] ${message}`, data || '');
            }
        }
    }
    // Auto-initialize if data-minimact-auto-init is present
    if (typeof window !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                if (document.body.hasAttribute('data-minimact-auto-init')) {
                    const minimact = new Minimact(document.body, {
                        enableDebugLogging: document.body.hasAttribute('data-minimact-debug')
                    });
                    minimact.start().catch(console.error);
                    window.minimact = minimact;
                }
            });
        }
        else {
            if (document.body.hasAttribute('data-minimact-auto-init')) {
                const minimact = new Minimact(document.body, {
                    enableDebugLogging: document.body.hasAttribute('data-minimact-debug')
                });
                minimact.start().catch(console.error);
                window.minimact = minimact;
            }
        }
    }
    // Make available globally
    if (typeof window !== 'undefined') {
        window.Minimact = Minimact;
    }

    exports.ClientStateManager = ClientStateManager;
    exports.DOMPatcher = DOMPatcher;
    exports.EventDelegation = EventDelegation;
    exports.HintQueue = HintQueue;
    exports.HydrationManager = HydrationManager;
    exports.Minimact = Minimact;
    exports.SignalRManager = SignalRManager;
    exports.TemplateRenderer = TemplateRenderer;
    exports.TemplateStateManager = TemplateStateManager;
    exports.clearClientComputedComponent = clearComponent;
    exports.clearComponentContext = clearComponentContext;
    exports.clearContextHookContext = clearContextHookContext;
    exports.computeAllForComponent = computeAllForComponent;
    exports.computeDependentVariables = computeDependentVariables;
    exports.computeVariable = computeVariable;
    exports.createContext = createContext;
    exports.default = Minimact;
    exports.getAllLastValues = getAllLastValues;
    exports.getClientComputedDebugInfo = getDebugInfo;
    exports.getComputedVariableNames = getComputedVariableNames;
    exports.getLastValue = getLastValue;
    exports.hasClientComputed = hasClientComputed;
    exports.registerClientComputed = registerClientComputed;
    exports.setComponentContext = setComponentContext;
    exports.setContextHookContext = setContextHookContext;
    exports.templateState = templateState;
    exports.useAnimationFrame = useAnimationFrame;
    exports.useComputed = useComputed;
    exports.useContext = useContext;
    exports.useEffect = useEffect;
    exports.useIdleCallback = useIdleCallback;
    exports.useMacroTask = useMacroTask;
    exports.useMicroTask = useMicroTask;
    exports.usePaginatedServerTask = usePaginatedServerTask;
    exports.usePub = usePub;
    exports.useRef = useRef;
    exports.useServerTask = useServerTask;
    exports.useSignalR = useSignalR;
    exports.useState = useState;
    exports.useSub = useSub;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=core-r.js.map
