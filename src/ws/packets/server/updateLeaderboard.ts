import { MooMoo } from "../../../../app";

function updateLeaderboard(data: Array<any>) {
    MooMoo.LeaderboardManager.updateLeaderboard(data);
}

export default updateLeaderboard;