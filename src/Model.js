/**
 * builds model from scheme
 * @param  {object}  scheme
 * @return {object}
 */
export default function buildModel(scheme, responses) {
  //copying scheme to solo object
  const model = scheme.questions.map( (item, i) => (Object.assign({}, item)));

  let nextAvailableResponsesKey = 0;
  for (let key in model) {
    let item = model[key];

    if (item._type === 'question') {
      //set pointer to element in responses object, where the value of input field will be stored
      item._responseKey = nextAvailableResponsesKey;
      nextAvailableResponsesKey++;

      item.getValue = () => (responses[item._responseKey]);
      //Object.defineProperty(item, "value", { get: function () { return responses[item._responseKey]; } });
    }
  }

  console.log('Builded model: ');
  console.log(model);
  return model;
}