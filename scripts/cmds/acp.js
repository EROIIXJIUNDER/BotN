const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "autoAccept",
    aliases: ['acp'],
    version: "1.0",
    author: "Asmit",
    countDown: 8,
    role: 2,
    shortDescription: "Automatically accept friend requests",
    longDescription: "Automatically accepts friend requests every 5 seconds without any manual input.",
    category: "Utility",
  },

  onStart: async function ({ event, api }) {
    const form = {
      av: api.getCurrentUserID(),
      fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
      fb_api_caller_class: "RelayModern",
      doc_id: "4499164963466303",
      variables: JSON.stringify({ input: { scale: 3 } })
    };

    const processFriendRequests = async () => {
      try {
        const listRequest = JSON.parse(await api.httpPost("https://www.facebook.com/api/graphql/", form)).data.viewer.friending_possibilities.edges;
        
        if (listRequest.length === 0) return; // No new friend requests
        
        const autoForm = {
          av: api.getCurrentUserID(),
          fb_api_caller_class: "RelayModern",
          variables: {
            input: {
              source: "friends_tab",
              actor_id: api.getCurrentUserID(),
              client_mutation_id: Math.round(Math.random() * 19).toString()
            },
            scale: 3,
            refresh_num: 0
          },
          fb_api_req_friendly_name: "FriendingCometFriendRequestConfirmMutation",
          doc_id: "3147613905362928"
        };

        for (const user of listRequest) {
          autoForm.variables.input.friend_requester_id = user.node.id;
          autoForm.variables = JSON.stringify(autoForm.variables);
          await api.httpPost("https://www.facebook.com/api/graphql/", autoForm);
          autoForm.variables = JSON.parse(autoForm.variables);

          // Notify group chat with accepted user details
          const groupChatID = "7826179514097414"; // Replace with the actual group chat thread ID
          api.sendMessage(`Accepted friend request:\nName: ${user.node.name}\nUID: ${user.node.id}`, groupChatID);
        }
      } catch (error) {
        console.error("Error processing friend requests:", error);
      }
    };

    // Check for new friend requests every 5 seconds
    setInterval(processFriendRequests, 5000);
  }
};
