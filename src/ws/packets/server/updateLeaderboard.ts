import { MooMoo } from "../../../../app";

function updateLeaderboard(data: Array<any>) {
    let leaderboarddata = data[0]
    MooMoo.LeaderboardManager.updateLeaderboard(leaderboarddata);
    MooMoo.emit("updateLeaderboard", data);
    MooMoo.emit("updateleaderboard", data);
    MooMoo.emit("5", data);
}

export default updateLeaderboard;