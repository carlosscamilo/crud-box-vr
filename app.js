const API_URL = 'http://localhost:3000/inventory';
let inventory = [];
let selectedIndex = null;

// Inicializa a cena quando o A-Frame carregar
document.addEventListener('DOMContentLoaded', () => {
    applyBrushIcon();
    const scene = document.querySelector('a-scene');
    if (scene.hasLoaded) {
        loadInventory();
    } else {
        scene.addEventListener('loaded', loadInventory);
    }
});

// Desenha ícone de lápis diretamente no canvas e aplica como textura 3D
function applyBrushIcon() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 256, 256);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.save();
    ctx.translate(128, 128);
    ctx.rotate(-Math.PI / 4);

    // Corpo do lápis
    ctx.beginPath();
    ctx.moveTo(-20, -82);
    ctx.lineTo(20, -82);
    ctx.lineTo(20, 48);
    ctx.lineTo(-20, 48);
    ctx.closePath();
    ctx.stroke();

    // Linha da borracha
    ctx.beginPath();
    ctx.moveTo(-20, -57);
    ctx.lineTo(20, -57);
    ctx.stroke();

    // Ponta (triângulo)
    ctx.beginPath();
    ctx.moveTo(-20, 48);
    ctx.lineTo(0, 90);
    ctx.lineTo(20, 48);
    ctx.stroke();

    ctx.restore();

    const plane = document.querySelector('#update-icon-plane');
    const applyTexture = () => {
        const mesh = plane.getObject3D('mesh');
        if (mesh) {
            const texture = new AFRAME.THREE.CanvasTexture(canvas);
            mesh.material.map = texture;
            mesh.material.transparent = true;
            mesh.material.color.set(0xffffff);
            mesh.material.needsUpdate = true;
        }
    };
    if (plane.hasLoaded) {
        applyTexture();
    } else {
        plane.addEventListener('loaded', applyTexture);
    }
}

// GET - Buscar todos os itens do JSON Server
async function loadInventory() {
    try {
        const response = await fetch(API_URL);
        inventory = await response.json();
        renderScene();
    } catch (error) {
        console.error('Erro ao carregar inventário. JSON Server está rodando?', error);
    }
}

// GET - Renderizar todos os itens na cena 3D
function renderScene() {
    const container = document.querySelector('#inventory-container');
    container.innerHTML = '';

    inventory.forEach((item, index) => {
        const entity = document.createElement('a-box');
        entity.setAttribute('position', `${index * 1.5 - 1} 0.5 -5`);
        entity.setAttribute('class', 'clickable');

        // Destaque visual no cubo selecionado
        if (index === selectedIndex) {
            entity.setAttribute('material', `color: ${item.color}; emissive: #ffff00; emissiveIntensity: 0.6`);
            entity.setAttribute('scale', '1.2 1.2 1.2');
        } else {
            entity.setAttribute('color', item.color);
        }

        // Clique no cubo apenas seleciona (não abre modal)
        entity.addEventListener('click', () => {
            selectedIndex = index;
            renderScene();
        });

        container.appendChild(entity);
    });
}

// Abre o modal para editar a cor do cubo
function openColorModal(index) {
    selectedIndex = index;
    const modal = document.querySelector('#color-modal');
    const colorPicker = document.querySelector('#color-picker');
    colorPicker.value = inventory[index].color;
    modal.style.display = 'block';
}

// Fecha o modal
function closeColorModal() {
    document.querySelector('#color-modal').style.display = 'none';
    selectedIndex = null;
}

// PUT - Atualizar cor do item no JSON Server
document.querySelector('#confirm-color').addEventListener('click', async () => {
    if (selectedIndex !== null) {
        const newColor = document.querySelector('#color-picker').value;
        const item = inventory[selectedIndex];
        try {
            const response = await fetch(`${API_URL}/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...item, color: newColor })
            });
            inventory[selectedIndex] = await response.json();
            renderScene();
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
        }
        closeColorModal();
    }
});

// Excluir item pelo modal
document.querySelector('#delete-item').addEventListener('click', () => {
    if (selectedIndex !== null) {
        deleteItem(selectedIndex);
        closeColorModal();
    }
});

// Cancelar
document.querySelector('#cancel-color').addEventListener('click', closeColorModal);

// PUT - Abrir modal ao clicar no botão de atualização virtual
document.querySelector('#update-button').addEventListener('click', () => {
    if (selectedIndex !== null) {
        openColorModal(selectedIndex);
    }
});

// POST - Criar novo item no JSON Server
document.querySelector('#add-button').addEventListener('click', async () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const newItem = {
        color: '#' + randomColor,
        size: 1
    };
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });
        const created = await response.json();
        inventory.push(created);
        renderScene();
    } catch (error) {
        console.error('Erro ao criar item:', error);
    }
});

// DELETE - Remover item específico do JSON Server
async function deleteItem(index) {
    const item = inventory[index];
    try {
        await fetch(`${API_URL}/${item.id}`, { method: 'DELETE' });
        inventory.splice(index, 1);
        renderScene();
    } catch (error) {
        console.error('Erro ao deletar item:', error);
    }
}

// DELETE - Remover o último item
document.querySelector('#remove-button').addEventListener('click', async () => {
    if (inventory.length > 0) {
        await deleteItem(inventory.length - 1);
    }
});

// DELETE - Remover todos os itens
document.querySelector('#remove-all-button').addEventListener('click', async () => {
    try {
        await Promise.all(inventory.map(item =>
            fetch(`${API_URL}/${item.id}`, { method: 'DELETE' })
        ));
        inventory = [];
        renderScene();
    } catch (error) {
        console.error('Erro ao remover todos os itens:', error);
    }
});

