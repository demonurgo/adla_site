# ⚠️ **BACKUP & REVERSÃO**

## 💾 **Estado Anterior (Backup Mental)**

Caso precise voltar ao estado anterior, aqui estão os valores originais:

### **CSS - Seção Azul:**
```css
/* ANTES */
.blue-section {
    background-color: #000B39;
    padding: 50px 0 70px;
    color: #C9E165;
    margin-top: 30px;
}

.section-text {
    font-size: 32px;
    margin-bottom: 50px;
}
```

### **CSS - Logos:**
```css
/* ANTES */
.logo-slide {
    width: 240px;
    height: 160px;
    margin: 0 40px;
}
```

### **CSS - Navbar:**
```css
/* ANTES */
.main-nav {
    padding: 30px 0;
    min-height: 80px;
}

body {
    padding-top: 90px;
}

.hero-section {
    min-height: calc(100vh - 90px);
}
```

---

## 🔄 **Como Reverter (Se Necessário)**

### **Opção 1: Git Reset (Se tem controle de versão)**
```bash
git log --oneline
git reset --hard [hash_do_commit_anterior]
```

### **Opção 2: Edição Manual**
1. Abra `css/styles.css`
2. Substitua os valores modificados pelos valores "ANTES" acima
3. Remove a classe `.blue-section.blurred` e o CSS do blur
4. No `js/main.js`, remova a função `handleBlueSection()`

### **Opção 3: Backup Completo**
Faça uma cópia da pasta `adla_site` antes de qualquer modificação futura:
```
C:\Users\aethe\Desktop\adla_site_backup_original\
```

---

## 📋 **Valores Exatos para Reversão**

| Propriedade | Valor Original | Valor Atual |
|-------------|----------------|-------------|
| `.blue-section padding` | `50px 0 70px` | `0` + flexbox |
| `.section-text font-size` | `32px` | `28px` |
| `.section-text margin-bottom` | `50px` | `20px` |
| `.logo-slide width` | `240px` | `140px` |
| `.logo-slide height` | `160px` | `80px` |
| `.main-nav padding` | `30px 0` | `15px 0` |
| `.main-nav min-height` | `80px` | `60px` |
| `body padding-top` | `90px` | `60px` |
| `.hero-section min-height` | `calc(100vh - 90px)` | `calc(80vh - 60px)` |

---

## 🎯 **Modificações Recomendadas (Se Quiser Ajustar)**

### **Se a blue-section ficou MUITO baixa:**
```css
.blue-section {
    min-height: 220px; /* Aumente de 180px para 220px */
}
```

### **Se os logos ficaram MUITO pequenos:**
```css
.logo-slide {
    width: 160px;  /* Aumente de 140px para 160px */
    height: 90px;  /* Aumente de 80px para 90px */
}
```

### **Se a navbar ficou MUITO fina:**
```css
.main-nav {
    padding: 20px 0; /* Aumente de 15px para 20px */
    min-height: 70px; /* Aumente de 60px para 70px */
}
```

### **Se quer ajustar o blur:**
```css
.blue-section.blurred {
    filter: blur(2px);    /* Diminua de 3px para 2px */
    opacity: 0.8;         /* Aumente de 0.7 para 0.8 */
}
```

---

## 🚀 **Próximos Passos Sugeridos**

1. **Teste em dispositivos reais** (não só DevTools)
2. **Peça feedback** de alguns usuários
3. **Monitore métricas** (tempo na página, taxa de bounce)
4. **Ajuste conforme necessário** usando os valores acima

---

## 📞 **Suporte**

Se precisar de help com reversão ou ajustes:
- Todos os arquivos modificados estão documentados
- Valores originais salvos neste documento
- Processo de reversão é simples e rápido

**✨ Lembre-se: Sempre faça backup antes de modificações futuras!**
