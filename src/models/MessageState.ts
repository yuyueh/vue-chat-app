import ChatTypeEnum from './ChatTypeEnum';

export interface Message {
    id: string;
    uid: string;
    type: ChatTypeEnum;
    myself: boolean;
    displayName: string;
    doc: firebase.firestore.DocumentData;
    timestamp: firebase.firestore.Timestamp;
}

export interface TextMessage extends Message {
    type: ChatTypeEnum.Text;
    text: string;
}

export interface StickerMessage extends Message {
    type: ChatTypeEnum.Sticker;
    imagePath: string;
}
