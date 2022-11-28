import { Video } from "../models/index.js";

const videos = [
  new Video(
    "https://player.vimeo.com/external/436572488.sd.mp4?s=eae5fb490e214deb9ff532dd98d101efe94e7a8b&profile_id=139&oauth2_token_id=57447761",
    3,
    "Basic how to ride your skateboard comfortly",
    54281,
    new Date(2022, 10, 15),
    480
  ),
  new Video(
    "https://player.vimeo.com/external/449972745.sd.mp4?s=9943177fe8a6147b7bc4598259401f06ec57878a&profile_id=139&oauth2_token_id=57447761",
    4,
    "Prepare for your first skateboard jump",
    42712,
    new Date(2022, 11, 2),
    300
  ),
  new Video(
    "https://player.vimeo.com/external/436553499.sd.mp4?s=0e44527f269278743db448761e35c5e39cfaa52c&profile_id=139&oauth2_token_id=57447761",
    5,
    "Basic equipment to play skateboard safely",
    64208,
    new Date(2022, 10, 6),
    420
  ),
  new Video(
    "https://player.vimeo.com/external/361861493.sd.mp4?s=19d8275ca755d653042a87ef28b2f0b2eabf57d0&profile_id=139&oauth2_token_id=57447761",
    6,
    "Tips to playing skateboard on the ramp",
    50610,
    new Date(2022, 10, 29),
    360
  ),
];

export default videos;
