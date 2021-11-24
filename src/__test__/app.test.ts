import supertest from "supertest";
import  app from "../app"


 describe("GET /api/books", ()=> {
     test("GET api/books", (done)=>{
        supertest(app)
         .get("api/books")
         .expect("Content-Type", /json/)
         .expect(200)
         .expect((res)=>{
             expect (res.body[0]).toHaveProperty('bookId')
             expect(res.status).toBe(200)
             expect(res.body).toHaveProperty('success')
         })
         .end((err, res) => {
             if(err) return done(err);
             return done();
         })
     })

//TEST FOR POST DATA
test("POST /api/books", (done)=> {
    supertest(app)
    .post("api/books")
    .expect("Content-Type", /json/)
    .send({

      "Title": "Six Month without Girlfriend",
      "Author": "hghrgf",
      "datePublished": "2021-0-12T19:0454.455z",
      "Description": "the experience in decagon makes me not to see babe for the length of six month, that isn pathetic",
      "pageCount": 354,
      "Genre": "autobiography",
      "bookId": 4,
      "Publisher": "hademath"
    })
    .expect(201)
    .expect((res)=>{
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('message')
    })
    .end((err, res)=>{
        if(err) return done(err);
        return done()
    });
});


//TEST FOR PUT

test("PUT /api/books", (done)=>{
    supertest(app)
    .put("api/books/2")
    .expect("Content-Type", /json/)
    .send({
        "Title": "Edited page",
        "Author": "Adebayo Crown",
        "datePublished": "2021-0-12T19:0454.455z",
        "Description": "A H is a memoir by Barack Obama, the 44th President",
        "pageCount": 690665,
        "Genre": "autobiography",
        "bookId": 2,
        "Publisher": "jide"
    })
    .expect(201)
    .expect((res)=>{
        expect(res.status).toBe(201)
        expect(res.body.data).toBe('bookId')
        expect(res.body).toHaveProperty('success')
    })
    .end((err, res)=>{
        if(err) return done(err);
        return done();
    });
});

//TEST FOR DELETE DATA

test("DELETE /api/books", (done)=>{
    supertest(app)
    .delete("api/books/12")
    .expect("Content-Type", /json/)
    .send({
        "Title": "Edited page",
        "Author": "Adebayo Crown",
        "datePublished": "2021-0-12T19:0454.455z",
        "Description": "A H is a memoir by Barack Obama, the 44th President",
        "pageCount": 690665,
        "Genre": "autobiography",
        "bookId": 12,
        "Publisher": "jide"
    })
    .expect(201)
    .expect((res)=>{
        expect(res.body.data).toHaveProperty('bookID')
        expect(res.body).toHaveProperty("success")
        expect(res.status).toBe(200)
    })
    .end((err, res)=>{
        if(err) return done(err);
        return done();
    })
})


 })