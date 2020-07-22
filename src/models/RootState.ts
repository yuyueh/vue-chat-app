import { MemberState } from './MemberState';

export interface RootState {
    user: MemberState;
    loading: boolean;
}
