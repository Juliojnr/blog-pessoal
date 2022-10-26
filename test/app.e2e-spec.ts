import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { response } from 'express';

describe('Testes dos Módulos User e Auth (e2e)', () => {
  let token: any;
  let userId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_blogpessoal_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('01 - Deve Cadastrar Usuário', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/user/register')
    .send({
      name: 'root',
      user: 'root@root.com',
      password: 'rootroot',
      photo: ''
    })
      expect (201)
      userId = resposta.body.id;
    })

  it('02 - Deve Autenticar Usuário', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/auth/logar')
    .send({
      name: 'root',
      user: 'root@root.com'
    })
      expect (200)
      userId = resposta.body.token
    })

  it('03 - Não deve duplicar Usuário', async () => {
    request(app.getHttpServer())
    .post('/user/register')
    .send({
      name: 'root',
      user: 'root@root.com',
      password: 'rootroot',
      photo: ''
    })
        .expect (400)
    })

  it('04 - Deve listar todos os Usuários', async () => {
    return request(app.getHttpServer())
      .get('/user/all')
      .set('Authorization', `${token}`)
      .send({})
      expect (200)
    });

    it('05 - Deve atualizar um Usuário', async () => {
      request(app.getHttpServer())
      .put('/user/update')
      .set('Authorization', `${token}`)
      .send({
        id: userId,
        name: 'root atualizado',
        user: 'root@root.com',
        password: 'rootroot',
        photo: ''
      })
        .expect(200)
        .then(resposta => {
          expect('root atualizado').toEqual(resposta.body.name)
        })
      })
});
