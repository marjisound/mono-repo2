function isToday(date: Date): boolean {
    const today = new Date();
    return (date.toDateString() === today.toDateString());
}

function isWithin24Hours(date: Date): boolean {
    const today = new Date();
    return (date.valueOf() > (today.valueOf() - (24 * 60 * 60 * 1000)));
}

function isWithinPastWeek(date: Date): boolean {
    const daysAgo = new Date().valueOf() - (7 * 24 * 60 * 60 * 1000);
    return date.valueOf() >= daysAgo;
}

function isWithinPastYear(date: Date): boolean {
    const weeksAgo = new Date().valueOf() - (52 * 7 * 24 * 60 * 60 * 1000);
    return date.valueOf() >= weeksAgo;
}

function isValidDate(date: Date): boolean {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        return false;
    }
    return !isNaN(date.getTime());
}

export function makeRelativeDate(date: Date): string | null {
    const then: Date = new Date(date);
    const now: Date = new Date();

    if (!isValidDate(then)) {
        return null;
    }

    const delta: number = parseInt(`${(now.valueOf() - then.valueOf()) / 1000}`, 10);

    if (delta < 0) {
        return null;
    } else if (delta < 55) {
        return `${delta}s`;
    } else if (delta < (55 * 60)) {
        const minutesAgo = Math.round(delta / 60);

        if (minutesAgo === 1) {
            return 'Now';
        } else {
            return `${minutesAgo}m ago`;
        }
    } else if (isToday(then) || isWithin24Hours(then)) {
        const hoursAgo = Math.round(delta / 3600);
        return `${hoursAgo}h ago`;
    } else if (isWithinPastWeek(then)) {
        const daysAgo = Math.round(delta / 3600 / 24);
        return `${daysAgo}d ago`;
    } else if (isWithinPastYear(then)) {
        const weeksAgo = Math.round(delta / 3600 / 24 / 7);
        return `${weeksAgo}w ago`;
    } else {
        const yearsAgo = Math.round(delta / 3600 / 24 / 7 / 52);
        return `${yearsAgo}y ago`;
    }
}

export function formatDate(date: Date): string {
    const options = {
        weekday: "long", year: "numeric", month: "long",
        day: "numeric", hour: "numeric", minute: "numeric"
    }
    const dateParts = new Date(date)
        .toLocaleTimeString("en-us", options)
        .replace(/,/g, '')
        .split(' ');

    // 7:00 Friday, 13 September 2019
    return `${dateParts[4]} ${dateParts[0]}, ${dateParts[2]} ${dateParts[1]} ${dateParts[3]}`
}
