export function getLastSevenDays() {
    const today = new Date();
    const lastSevenDays = [];
    const date = new Date(today);

    for (let i = 6; i >= 0; i--) {
        date.setDate(today.getDate() - i);
        lastSevenDays.push(date.toLocaleDateString('en-GB', { day: '2-digit' }));
    }

    return lastSevenDays;
}