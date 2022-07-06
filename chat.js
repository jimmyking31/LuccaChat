class ChatComponent extends HTMLElement {
    constructor() {
      super()

        this.Username = "lol";

        this.setAttribute('class', 'col-md-6')

        var wrapper = document.createElement('div');

        var card = document.createElement('div');
        card.setAttribute('class','card card-chat');

        var cardHeader = document.createElement('h5');
        cardHeader.setAttribute('class','card-header');
        cardHeader.textContent = "Chat";

        var cardBody = document.createElement('div');
        cardBody.setAttribute('class','card-body chat-history');

        var messages = document.createElement('ul');
        messages.setAttribute('class','m-b-0');

        cardBody.append(messages);


        var cardFooter = document.createElement('div');
        cardFooter.setAttribute('class','card-footer');

        var inputGroup = document.createElement('div');
        inputGroup.setAttribute('class','input-group mb-3');

        var input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('class','form-control chat-input');
        input.setAttribute('placeholder','Message...');

        var inputSubmit = document.createElement('button');
        inputSubmit.setAttribute('type','button');
        inputSubmit.setAttribute('class','btn btn-outline-secondary chat-submit');
        inputSubmit.textContent = "Send message";

        inputGroup.append(input);
        inputGroup.append(inputSubmit);

        cardFooter.append(inputGroup);


        card.append(cardHeader);
        card.append(cardBody);
        card.append(cardFooter);

        wrapper.append(card);

        this.Wrapper = wrapper;
        this.Input = input;
        this.SubmitButton = inputSubmit;
        this.MessagesContainer = messages;

        this.appendChild(wrapper);

        this.boundHandleClick = this.handleClick.bind(this)
    }

    connectedCallback() {
        console.log(this.Wrapper)
        this.SubmitButton.addEventListener('click', this.boundHandleClick)
        console.log(chatManager)

        chatManager.RegisterChat(this);

    }

    disconnectedCallback(){
        chatManager.UnRegisterChat(this);
    }
    
    CreateMessage(message, type) {
        var li = document.createElement('li');
        li.setAttribute('class','clearfix');

        var msg = document.createElement('div');

        if (type == "sent")
            msg.setAttribute('class','message other-message float-end');

        if (type == "received")
            msg.setAttribute('class','message my-message float-start');

        msg.textContent = message;

        li.append(msg);

        return li;
    }

    ReceiveMessage(source, message) {
        this.MessagesContainer.append(this.CreateMessage(message, "received"));
    }

    SendMessage() {
        let message = this.Input.value;
        if (message != null && message != "") {
            chatManager.SendMessage(this, message);
            this.MessagesContainer.append(this.CreateMessage(message, "sent"));
        }
        this.Input.value = null;
    }


    handleClick(e) {
        this.SendMessage();
    }
  }

  customElements.define("chat-component", ChatComponent);