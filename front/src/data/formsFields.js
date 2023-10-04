export const registerFormFields = [
    {
      label: "Nome",
      type: "text"
    },
    {
      label: "CPF",
      type: "text"
    },
    {
      label: "Email",
      type: "email"
    },
    {
      label: "Senha",
      type: "password"
    },
    {
      label: "Confirmar senha",
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
            label: "Telefone",
            type: "tel"
          },
          {
            label: "Celular",
            type: "text"
          },
          {
            label: "Email para contato",
            type: "text"
          }
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
            label: "CEP",
            type: "text"
          },
          {
            label: "Número",
            type: "number"
          },
          {
            label: "Complemento",
            type: "text"
          }, 
          {
            label: "Ponto de referência",
            type: "text"
          }
        ]
    },
    {
        pageNumber: 3,
        fields: [
          {
            label: "Serviço", 
            type: "text"
          },
          {
            label: "Valor",
            type: "number"
          },
          {
            label: "Descrição",
            type: "text"
          }
        ]
    }
]

export const clientFormData = {
  field: {
    label: "Celular",
    type: "number"
  },
  tags: [
    "Barbearia", 
    "Depilação", 
    "Esteticista", 
    "Nails designer", 
    "Massagem", 
    "Spa", 
    "Saúde", 
    "Tatuagem"
  ]
}