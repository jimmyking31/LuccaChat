class ChatManager
{
    constructor(username){
        this.Chats = []
    }

    RegisterChat(source){
        this.Chats.push(source);
    }

    UnRegisterChat(source){
        this.Chats = this.Chats.filter(function(item){
            return item != source;
        });
    }

    SendMessage(source, message) {
        this.Chats.forEach(e => {
            if (e != source)
                e.ReceiveMessage(source, message);
        });
    }
}

var chatManager = new ChatManager();