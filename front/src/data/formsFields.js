export const registerFormFields = [
    {
      label: "Nome",
      type: "text"
    },
    {
      label: "Celular",
      type: "text"
    },
    {
      label: "Email",
      type: "email"
    },
    {
      label: "Senha",
      type: "password"
    }
]

export const providerFormFields = [
    {
        pageNumber: 1,
        fields: [
          {
            label: "Especialidade",
            type: "text"
          },
          {
            label: "Endereco",
            type: "text"
          },
        ]
    },
    {
        pageNumber: 2,
        fields: [
          {
            label: "Abertura",
            type: "time"
          },
          {
            label: "Fechamento", 
            type: "time"
          },
          {
            label: "Email para contato",
            type: "text"
          }
        ]
    }
]

// export const clientFormData = {
//   fields: [
//     {
//       label: "Data de nascimento",
//       type: "date"
//     },
//     {
//       label: "Gênero",
//       type: "text"
//     },
//     {
//       label: "Estado civil",
//       type: "text"
//     }
//   ],
//   tags: [
//     "Barbearia", 
//     "Depilação", 
//     "Esteticista", 
//     "Nails designer", 
//     "Massagem", 
//     "Spa", 
//     "Saúde", 
//     "Tatuagem"
//   ]
// }