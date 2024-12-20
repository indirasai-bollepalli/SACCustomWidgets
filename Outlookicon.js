(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
        :host {
          display: inline-block;
          background-color: #0078d4;
          border-radius: 50px;
          color: #FFF;
          cursor: pointer;
          font-weight: bold;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          text-transform: uppercase;
        }
  
        #caption {
          position: relative;
          margin-top: 0px;
        }
      </style>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" width="30"/>
        <span id="caption"></span>
      </div>
	`;

	class Widget extends HTMLElement {
        constructor() {
          super();
          
          let shadowRoot = this.attachShadow({ mode: "open" });
          shadowRoot.appendChild(template.content.cloneNode(true));
          
          this._props = {};
          
          this.addEventListener("click", this.onClick.bind(this));
        }
        
        async connectedCallback() {
          this.initMain();
        }
        
        async initMain() {
          let email = this._props.email; // default value if email is not set
          let subject = this._props.subject; // default value if subject is not set
          let message = this._props.message; // default value if message is not set
          let caption = this._props.caption; // default value if caption is not set
    
          // use values to update the widget's contents
          this.shadowRoot.querySelector("#caption").textContent = caption;
        }
        
        onCustomWidgetBeforeUpdate(changedProperties) {
          this._props = {
            ...this._props,
            ...changedProperties
          };
        }
        
        onCustomWidgetAfterUpdate(changedProperties) {
          this.initMain();
        }
        
        async onClick() {
          let url = `mailto:${this._props.email}?subject=${encodeURIComponent(this._props.subject)}&body=${encodeURIComponent(this._props.message)}`;
          window.open(url, "_blank");
        }
      }
    

      customElements.define("com-sample-sap-outlookwidget", Widget);
    })();