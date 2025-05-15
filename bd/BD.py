from fastapi import FastAPI, HTTPException;
from fastapi.middleware.cors import CORSMiddleware;
from pydantic import BaseModel;
from datetime import datetime, timedelta, timezone

import mysql.connector;
import bcrypt;
import jwt;

app = FastAPI()

# Alterar a chave secreta posteriormente visto que a mesma foi exposta no github.
SECRET_KEY = "[S!v`qVS_'OStH7p.S-s<C~t£k:\"L£9!${EIs(l}F{|P%_{=4m";
ALGORITHM = "HS256";

origins = [
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Função para conectar ao banco
def conectar_banco():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="bancodedados"
    )

# Body para criação do usuário
class createUser(BaseModel):
    realName: str
    userName: str
    email: str
    accountPassword: str

# Body para logar um usuário
class loginUser(BaseModel):
    email: str
    accountPassword: str

# Body para deslogar um usuário
class logoutUser(BaseModel):
    userId: str
    accessToken: str

# Body para requisitar um token
class infoAccessToken(BaseModel):
    accessToken: str
    email: str

# Body para um novo manga
class infoNewManga(BaseModel):
    mangaName: str
    resumeManga: str
    mangaImage: str
    genre: str
    dateLatestChapter: str

# Rota para buscar todos os usuários
@app.get("/usuarios")
def listar_usuarios():
    conn = conectar_banco();
    cursor = conn.cursor(dictionary=True);
    cursor.execute("SELECT * FROM usuarios");
    response = cursor.fetchall();
    cursor.close();
    conn.close();
    return response;

# Rota para buscar um usuário em específico
@app.get("/usuarios/{id}")
def listar_usuario(id: int):
    conn = conectar_banco();
    cursor = conn.cursor(dictionary=True);
    sql = "SELECT realName, username, email, imgProfile FROM usuarios WHERE codigo = %s";
    valores = (id,);
    cursor.execute(sql, valores);
    response = cursor.fetchone();
    cursor.close();
    conn.close();
    return response;

# Rota para adicionar um novo usuário
@app.post("/createUser")
def criar_usuario(dataUser: createUser):
    conn = conectar_banco();
    cursor = conn.cursor();
    sql = "INSERT INTO usuarios (realName, userName, email, accountPassword) VALUES (%s, %s, %s, %s)";

    # Realiza a criptografia da senha antes de armazena-la no banco de dados
    password = cryptPassword(dataUser.accountPassword);

    valores = (dataUser.realName, dataUser.userName, dataUser.email, password);
    cursor.execute(sql, valores);
    conn.commit();
    cursor.close();
    conn.close();

    return {"mensagem": "Usuário criado com sucesso!"};

# Rota para logar um usuário
@app.post("/login")
def login(dataUser: loginUser):
    conn = conectar_banco();
    cursor = conn.cursor();
    sql = "SELECT codigo, accountPassword FROM usuarios WHERE email = %s";
    valores = (dataUser.email,);
    cursor.execute(sql, valores);
    response = cursor.fetchone();
    conn.commit();
    cursor.close();
    conn.close();

    if checkPassword(dataUser.accountPassword, response[1]):
        token = createToken(dataUser.email);
        saveAccessToken(token, dataUser.email);
        return {"mensagem": "Login bem-sucedido!", "token": token, "email": dataUser.email, "userId": response[0]};
    else:
        raise HTTPException(status_code=401, detail="Credenciais inválidas");

# Rota para deslogar do site
@app.post("/logout")
def logout(dataLogout: logoutUser):
    conn = conectar_banco();
    cursor = conn.cursor();
    sql = "UPDATE usuarios SET accessToken = %s WHERE codigo = %s AND accessToken = %s";
    valores = ("NULL", dataLogout.userId, dataLogout.accessToken);
    cursor.execute(sql, valores);
    response = cursor.fetchone();
    conn.commit();
    cursor.close();
    conn.close();
     
# Rota para resgatar o caminho da foto de perfil do usuário
@app.get("/imgProfile/{id}")
def imgProfile(id: int):
    conn = conectar_banco();
    cursor = conn.cursor(dictionary=True);
    sql = "SELECT imgProfile FROM usuarios WHERE codigo = %s";
    valores = (id,);
    cursor.execute(sql, valores);
    response = cursor.fetchone();
    cursor.close();
    conn.close();
    return response

# Valida se o token é válido
@app.post("/validAccessToken")
def validAccessToken(dataToken: infoAccessToken):
    conn = conectar_banco();
    cursor = conn.cursor(dictionary=True);
    sql = "SELECT accessToken FROM usuarios WHERE accessToken = %s AND email = %s";
    valores = (dataToken.accessToken, dataToken.email);
    cursor.execute(sql, valores);
    response = cursor.fetchone();
    cursor.close();
    conn.close();

    validToken = checkToken(response["accessToken"]);
    return validToken;

# Rota para puxar a lista de mangas
@app.get("/latestMangas")
def lista_mangas():
    conn = conectar_banco();
    cursor = conn.cursor(dictionary=True);
    sql = "SELECT * FROM mangas ORDER BY dateLatestChapter DESC";
    cursor.execute(sql);
    response = cursor.fetchall();
    cursor.close();
    conn.close();
    return response;

# Rota para inserir um novo manga
@app.post("/newManga")
def newManga(infoNewManga: infoNewManga):
    conn = conectar_banco();
    cursor = conn.cursor();
    sql = "INSERT INTO mangas (mangaName, resumeManga, mangaImage, genre, dateLatestChapter) VALUES (%s, %s, %s, %s, %s)";
    valores = (infoNewManga.mangaName, infoNewManga.resumeManga, infoNewManga.mangaImage, infoNewManga.genre, infoNewManga.dateLatestChapter);
    cursor.execute(sql, valores);
    conn.commit();
    cursor.close();
    conn.close();

    return {"mensagem": "Manga adicionado com sucesso!"};


# Função para armazenar o token de acesso do usuário no banco de dados
def saveAccessToken(token: str, email: str):
    conn = conectar_banco();
    cursor = conn.cursor();
    sql = "UPDATE usuarios SET accessToken = %s WHERE email = %s";
    valores = (token, email);
    cursor.execute(sql, valores);
    conn.commit();
    cursor.close();
    conn.close();

# Função para criptografar a senha
def cryptPassword(password: str):
    saltRounds = 10;
    passHash = "";

    try:
        salt = bcrypt.gensalt(saltRounds);
        passHash = bcrypt.hashpw(password.encode('utf-8'), salt);
    except:
        raise HTTPException(status_code=500, detail="Erro ao criptografar a senha");

    return passHash;

# Função para validar a senha
def checkPassword(password: str, hash: str):
    if bcrypt.checkpw(password.encode('utf-8'), hash.encode('utf-8')):
        return True;
    else:
        return False;

# Função para criar um token
def createToken(email):
    payload = {
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=1),  # expira em 1 hora
        "iat": datetime.now(timezone.utc)  # empo de criação
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

# Função para verificar se o token é válido
def checkToken(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return True;
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")