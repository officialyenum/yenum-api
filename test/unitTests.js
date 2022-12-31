const app = require('../index');
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
const Game = require('../models/Game');
chai.use(chaiHttp);

var mockGame



describe('Game Unit Test', () => {

  Game.collection.drop();

  before((done) => {
    mockGame = new Game({
        title: 'Yenum Trivia', 
        description: 'Play My Trivia Game created with Unity C# and Opentdb api.', 
        url: 'https://games.yenum.dev/quizmaster',
        image_url: 'https://res.cloudinary.com/yenum-dev/image/upload/v1659700034/chuckymagic/quizmaster_gaas8v.png',
        tags: ["mobile","web"]
    });
    mockGame.save(function (err) {
      if(err){
        console.log(err);
      }
      done();
    })
  })

  describe('/getHome',() => {
    it('should return app info in base uri', (done) => {
      chai.request(app)
      .get('/').end((err, res) => {
        res.should.have.status(200);
        res.should.be.json
      })
      done();
    })
  })

  describe('/createAndGetGame',() => {
    it('should create app game details', (done) => {
      chai.request(app)
      .post('/api/games').send({
        title: 'Yenum Trivia 2', 
        description: 'Play My Trivia Game created with Unity C# and Opentdb api.', 
        url: 'https://games.yenum.dev/quizmaster',
        image_url: 'https://res.cloudinary.com/yenum-dev/image/upload/v1659700034/chuckymagic/quizmaster_gaas8v.png',
        tags: ["mobile","web"]
      }).end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.newGame.title.should.equal('Yenum Trivia 2'); 
      })
      done()
    })

  })

  describe('/getGames',() => {
    it('should get app games', (done) => {
      chai.request(app)
      .get('/api/games').end((err, res) => {
        res.body.games.should.be.a('array'); 
        res.should.have.status(200);
        res.should.be.json;
      })
      done()
    })
  })
})