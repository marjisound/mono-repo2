import { joinUrl } from '@root/src/web/lib/joinUrl';

// GET http://discussion.guardianapis.com/discussion-api/comment/3519111/context
// {
//     status: 'ok',
//     commentId: 3519111,
//     commentAncestorId: 3519111,
//     discussionKey: '/p/27y27',
//     discussionWebUrl:
//         'https://www.theguardian.com/commentisfree/cifamerica/2009/may/14/washington-post-torture-libel',
//     discussionApiUrl:
//         'https://discussion.guardianapis.com/discussion-api/discussion//p/27y27?orderBy=oldest&pageSize=20&page=1',
//     orderBy: 'oldest',
//     pageSize: 20,
//     page: 1,
// };

type CommentContextType = {
    status: 'ok' | 'error';
    commentId: number;
    commentAncestorId: number;
    discussionKey: string;
    discussionWebUrl: string;
    discussionApiUrl: string;
    orderBy: OrderByType;
    pageSize: PageSizeType; // TODO: Review these https://trello.com/c/7v4VDNY0/1326-review-page-size-values
    page: number;
};

type OrderByType = 'newest' | 'oldest' | 'mostrecommended';
type ThreadsType = 'collapsed' | 'expanded' | 'unthreaded';
type PageSizeType = 25 | 50 | 100;

interface FilterOptions {
    orderBy: OrderByType;
    pageSize: PageSizeType;
    threads: ThreadsType;
}

const objAsParams = (obj: any): string => {
    const params = Object.keys(obj)
        .map(key => {
            return `${key}=${obj[key]}`;
        })
        .join('&');

    return `?${params}`;
};

const initFiltersFromLocalStorage = (): FilterOptions => {
    let threads;
    let pageSize;
    let orderBy;

    try {
        // Try to read from local storage
        orderBy = localStorage.getItem('gu.prefs.discussioni.order');
        threads = localStorage.getItem('gu.prefs.discussioni.threading');
        pageSize = localStorage.getItem('gu.prefs.discussioni.pagesize');
    } catch (error) {
        // Sometimes it's not possible to access localStorage, we accept this and don't want to
        // capture these errors
        return {
            orderBy: 'newest',
            pageSize: 25,
            threads: 'collapsed',
        };
    }

    // If we found something in LS, use it, otherwise return defaults
    return {
        orderBy: orderBy ? JSON.parse(orderBy).value : 'newest',
        threads: threads ? JSON.parse(threads).value : 'collapsed',
        pageSize: pageSize ? JSON.parse(pageSize).value : 25,
    };
};

const buildParams = (filters: FilterOptions) => {
    return {
        orderBy: filters.orderBy,
        pageSize: filters.pageSize,
        displayThreaded:
            filters.threads === 'collapsed' || filters.threads === 'expanded',
    };
};

export const getCommentContext = async (
    ajaxUrl: string,
    commentId: number,
): Promise<CommentContextType> => {
    const url = joinUrl([ajaxUrl, 'comment', commentId.toString(), 'context']);
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .catch(error => {
            window.guardian.modules.sentry.reportError(
                error,
                'get-comment-page',
            );
        });
};
