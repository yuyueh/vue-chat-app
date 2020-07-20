import Vue from 'vue';

let state = {
    alwaysKeepAtEdge: false,
    scrollHeight: 0,
    isAtBottom: true,
    isAtTop: false,
};

const deviationOfRound = 0.5;

const scrollTo = (el: Element, height: number) => {
    if (typeof el.scrollTo === 'function') {
        el.scrollTo(0, height);
    } else {
        el.scrollTop = height; // eslint-disable-line no-param-reassign
    }
};

const scrollToBottom = (el: Element) => {
    scrollTo(el, el.scrollHeight);
};

const isAtTheTop = (el: Element) => el.scrollTop === 0;
// clientHeight會自動四捨五入 要加誤差值
const isAtTheBottom = (el: Element) =>
    el.scrollTop + el.clientHeight + deviationOfRound > el.scrollHeight;

const handleElmResize = (el: Element): MutationCallback => () => {
    if (state.alwaysKeepAtEdge && state.isAtBottom) {
        scrollToBottom(el);
    } else {
        state.isAtBottom = false;
    }

    if (state.isAtTop && !state.alwaysKeepAtEdge) {
        scrollTo(el, el.scrollHeight - state.scrollHeight);
    }

    state = {
        ...state,
        scrollHeight: el.scrollHeight,
    };
};

const handleScroll = (el: Element) => {
    const position = {
        isAtTop: isAtTheTop(el),
        isAtBottom: isAtTheBottom(el),
    };

    if (state.isAtBottom && !position.isAtBottom) {
        el.dispatchEvent(new Event('leave-from-bottom'));
    }

    if (position.isAtTop) {
        el.dispatchEvent(new Event('scroll-top-reach'));
    }

    if (position.isAtBottom) {
        el.dispatchEvent(new Event('scroll-bottom-reach'));
    }

    state = {
        ...state,
        isAtTop: position.isAtTop,
        isAtBottom: position.isAtBottom,
    };
};

let onScroll: (el: Event) => void;
let mutationObserver: MutationObserver;

export default Vue.directive('scroll-keep', {
    bind(el, { value: alwaysKeepAtEdge }) {
        state = {
            ...state,
            alwaysKeepAtEdge,
        };

        onScroll = handleScroll.bind(this, el);
        mutationObserver = new MutationObserver(handleElmResize(el));

        el.addEventListener('scroll', onScroll);
        mutationObserver.observe(el, {
            childList: true,
            subtree: true,
        });
    },
    unbind(el) {
        el.removeEventListener('scroll', onScroll);
        mutationObserver.disconnect();
    },
    update(_, { value: alwaysKeepAtEdge }) {
        state = {
            ...state,
            alwaysKeepAtEdge,
        };
    },
    inserted(el) {
        state = {
            ...state,
            scrollHeight: el.scrollHeight,
        };
        scrollToBottom(el);
    },
});
