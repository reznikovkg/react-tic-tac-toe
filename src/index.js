/** @jsx h */

function h(type, props, ...children) {
    return { type, props, children };
}

function createElement(node) {
    if (typeof node === "string") {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

function updateElement(rootElement, newElement, oldElement, index = 0) {
    if (newElement === undefined) {
        rootElement.removeChild(rootElement.children[index]);
        return;
    }

    if (oldElement === undefined) {
        rootElement.appendChild(createElement(newElement));
        return;
    }

    if (!newElement.children && !oldElement.children) {
        if (newElement !== oldElement) {
            rootElement.innerText = newElement;
        }

        return;
    }

    let len = oldElement.children.length > newElement.children.length ? oldElement.children.length : newElement.children.length;

    for (let i = 0; i < len; i++) {
        updateElement(rootElement.children[index], newElement.children[i], oldElement.children[i], i);
    }
}

const initDOM = (
    <div>
        <p>Hello!</p>
        <ul>
            <li>How is it going?</li>
        </ul>
    </div>
);

const addNode = (
    <div>
        <p>Hello!</p>
        <ul>
            <li>How is it going?</li>
        </ul>
        <p>Good</p>
    </div>
);

const removeNode = (
    <div>
        <p>Hello!</p>
        <ul>
            <li>How is it going?</li>
        </ul>
    </div>
);

const changeNode = (
    <div>
        <p>Hi!</p>
        <ul>
            <li>How is it going?</li>
        </ul>
    </div>
);

const rootElement = document.getElementById("root");
rootElement.appendChild(createElement(initDOM));

const buttons = document.getElementById("buttons");

const initNodeButton = document.createElement("button");
initNodeButton.innerText = "Init";
buttons.appendChild(initNodeButton);
initNodeButton.addEventListener("click", () => {
    updateElement(rootElement, initDOM, changeNode);
});

const addNodeButton = document.createElement("button");
addNodeButton.innerText = "Add";
buttons.appendChild(addNodeButton);
addNodeButton.addEventListener("click", () => {
    updateElement(rootElement, addNode, initDOM);
});

const removeNodeButton = document.createElement("button");
removeNodeButton.innerText = "Remove";
buttons.appendChild(removeNodeButton);
removeNodeButton.addEventListener("click", () => {
    updateElement(rootElement, removeNode, addNode);
});

const changeNodeButton = document.createElement("button");
changeNodeButton.innerText = "Change";
buttons.appendChild(changeNodeButton);
changeNodeButton.addEventListener("click", () => {
    updateElement(rootElement, changeNode, removeNode);
});
