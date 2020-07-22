import { Message } from './MessageState';
import { MemberState } from './MemberState';

export interface ChatState {
    members: { [key: string]: MemberState };
    messages: Message[];
    isNewestLoaded: boolean;
    loading: boolean;
}
