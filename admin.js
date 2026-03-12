const siteConfig = {
    companyName: 'ConnectCam',
    companyPhone: '(00) 00000-0000',
    companyEmail: 'contato@connectcam.com.br',
    primaryColor: '#6366f1',
    logo: ''
};

const galleryItems = [
    { id: 1, title: 'Sistema de Câmeras IP', desc: 'Loja comercial - Centro', category: 'cameras' },
    { id: 2, title: 'Controle de Acesso Biometrico', desc: 'Empresa corporativa', category: 'controle-acesso' },
    { id: 3, title: 'Sistema de Alarme', desc: 'Warehouse industrial', category: 'alarme' },
    { id: 4, title: 'Videomonitoramento 24h', desc: 'Condomínio residencial', category: 'cameras' },
    { id: 5, title: 'Automação Residencial', desc: 'Casa de alto padrão', category: 'automacao' },
    { id: 6, title: 'Catraca Eletrônica', desc: 'Academia fitness', category: 'controle-acesso' }
];

const blogPosts = [
    { id: 1, title: '5 Vantagens das Câmeras IP Sobre as Analógicas', category: 'tecnologia', excerpt: 'Descubra por que as câmeras IP são a escolha moderna...' },
    { id: 2, title: 'Como Escolher o Sistema de Controle de Acesso', category: 'controle-acesso', excerpt: 'Guia completo para escolher o sistema ideal...' },
    { id: 3, title: 'Dicas Para Proteger Sua Empresa Durante a Noite', category: 'seguranca', excerpt: 'Medidas essenciais de segurança noturna...' }
];

document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    renderGallery();
    renderBlog();
    setupTabs();
    setupFormListeners();
});

function setupTabs() {
    const navLinks = document.querySelectorAll('.admin-nav a[data-tab]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.dataset.tab;
            
            document.querySelectorAll('.admin-nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function setupFormListeners() {
    document.getElementById('companyName').addEventListener('input', (e) => {
        siteConfig.companyName = e.target.value;
    });
    document.getElementById('companyPhone').addEventListener('input', (e) => {
        siteConfig.companyPhone = e.target.value;
    });
    document.getElementById('companyEmail').addEventListener('input', (e) => {
        siteConfig.companyEmail = e.target.value;
    });
    document.getElementById('companyLogo').addEventListener('input', (e) => {
        siteConfig.logo = e.target.value;
    });
    document.getElementById('primaryColor').addEventListener('input', (e) => {
        siteConfig.primaryColor = e.target.value;
        document.documentElement.style.setProperty('--primary', e.target.value);
    });
}

function renderGallery() {
    const list = document.getElementById('galleryList');
    list.innerHTML = galleryItems.map(item => `
        <div class="gallery-item">
            <div class="gallery-item-info">
                <h4>${item.title}</h4>
                <span>${item.desc} - ${item.category}</span>
            </div>
            <div class="gallery-item-actions">
                <button class="btn-delete" onclick="deleteGalleryItem(${item.id})">Excluir</button>
            </div>
        </div>
    `).join('');
}

function renderBlog() {
    const list = document.getElementById('blogList');
    list.innerHTML = blogPosts.map(post => `
        <div class="blog-item">
            <div class="blog-item-info">
                <h4>${post.title}</h4>
                <span>${post.category}</span>
            </div>
            <div class="blog-item-actions">
                <button class="btn-delete" onclick="deleteBlogPost(${post.id})">Excluir</button>
            </div>
        </div>
    `).join('');
}

function addGalleryItem() {
    const title = document.getElementById('galleryTitle').value;
    const desc = document.getElementById('galleryDesc').value;
    const category = document.getElementById('galleryCategory').value;
    
    if (!title || !desc) {
        alert('Preencha todos os campos!');
        return;
    }
    
    const newItem = {
        id: Date.now(),
        title,
        desc,
        category
    };
    
    galleryItems.push(newItem);
    renderGallery();
    saveToStorage();
    
    document.getElementById('galleryTitle').value = '';
    document.getElementById('galleryDesc').value = '';
    
    alert('Projeto adicionado com sucesso!');
}

function deleteGalleryItem(id) {
    if (confirm('Tem certeza que deseja excluir?')) {
        const index = galleryItems.findIndex(item => item.id === id);
        if (index > -1) {
            galleryItems.splice(index, 1);
            renderGallery();
            saveToStorage();
        }
    }
}

function addBlogPost() {
    const title = document.getElementById('blogTitle').value;
    const category = document.getElementById('blogCategory').value;
    const excerpt = document.getElementById('blogExcerpt').value;
    
    if (!title || !excerpt) {
        alert('Preencha todos os campos!');
        return;
    }
    
    const newPost = {
        id: Date.now(),
        title,
        category,
        excerpt
    };
    
    blogPosts.push(newPost);
    renderBlog();
    saveToStorage();
    
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogExcerpt').value = '';
    
    alert('Artigo publicado com sucesso!');
}

function deleteBlogPost(id) {
    if (confirm('Tem certeza que deseja excluir?')) {
        const index = blogPosts.findIndex(post => post.id === id);
        if (index > -1) {
            blogPosts.splice(index, 1);
            renderBlog();
            saveToStorage();
        }
    }
}

function saveToStorage() {
    localStorage.setItem('connectcam_config', JSON.stringify(siteConfig));
    localStorage.setItem('connectcam_gallery', JSON.stringify(galleryItems));
    localStorage.setItem('connectcam_blog', JSON.stringify(blogPosts));
}

function loadFromStorage() {
    const config = localStorage.getItem('connectcam_config');
    const gallery = localStorage.getItem('connectcam_gallery');
    const blog = localStorage.getItem('connectcam_blog');
    
    if (config) {
        const parsed = JSON.parse(config);
        Object.assign(siteConfig, parsed);
        
        document.getElementById('companyName').value = siteConfig.companyName;
        document.getElementById('companyPhone').value = siteConfig.companyPhone;
        document.getElementById('companyEmail').value = siteConfig.companyEmail;
        document.getElementById('companyLogo').value = siteConfig.logo || '';
        document.getElementById('primaryColor').value = siteConfig.primaryColor;
        
        document.documentElement.style.setProperty('--primary', siteConfig.primaryColor);
    }
    
    if (gallery) {
        const parsed = JSON.parse(gallery);
        galleryItems.length = 0;
        galleryItems.push(...parsed);
    }
    
    if (blog) {
        const parsed = JSON.parse(blog);
        blogPosts.length = 0;
        blogPosts.push(...parsed);
    }
}

function saveAllChanges() {
    saveToStorage();
    alert('Alterações salvas com sucesso!');
}
