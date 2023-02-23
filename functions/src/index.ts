import * as admin from "firebase-admin";

admin.initializeApp();

import { createDao } from "./api/createDao";
import { getDaoInfo } from "./api/getDaoInfo";
import { getIsWeb3 } from "./api/getIsWeb3";
import { getPollDetail } from "./api/getPollDetail";
import { candidateToCurrentPoll } from "./api/candidateToCurrentPoll";

module.exports = { createDao, getDaoInfo, getIsWeb3, getPollDetail, candidateToCurrentPoll };