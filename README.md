# Backbone.Inflight

Patches Backbone's `Model` and `Collection` to have awareness of the current sync state.
Adds an `isLoading` method and `_inflight` count property.

Based on https://tbranyen.com/post/how-to-indicate-backbone-fetch-progress
