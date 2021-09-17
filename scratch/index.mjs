import fastify from 'fastify'

import boom from 'boom'

const start=()=>{
 const server=fastify({

 });
 server.listen(3000).then(()=>{
  console.log(`....`)
 }).catch(e=>{boom.badImplementation(e)})
}
start();
