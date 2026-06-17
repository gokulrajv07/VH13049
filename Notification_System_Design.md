# Notification System Design
# Stage 1

## Approach & Efficiency
To maintain and fetch the top 10 notifications efficiently as new ones scale up, we use a custom sorting comparator strategy based on predefined weights:
1. **Weight Assignment:** `Placement` (3) > `Result` (2) > `Event` (1).
2. **Tie-Breaking:** Timestamps are converted to UNIX epoch integers to sort identical types by recency.

## Scalability Analysis
- **Time Complexity:** O(N log N) per fetch due to the standard array sorting implementation where N is the total count of unread notifications.
- **Optimization Strategy:** For stream-heavy production environments, implementing a **Min-Heap (Priority Queue)** capped strictly at size `n` would optimize extraction time down to O(N log n), ensuring performance bounds remain constant regardless of incoming notification volumes.