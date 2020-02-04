import * as Webview from 'mobile-apps-thrift-typescript/Webview';
import { Epic } from 'mobile-apps-thrift-typescript/Epic';

export class WebviewHandler implements Webview.IHandler {
    webviewThriftPackage(): number {
        return 0;
    }

    insertEpics(epics: Epic[]): void {
        console.log("inserting epics");
    }

    insertEpic(epic: Epic): void {
        console.log("inserting epic");
    }
}