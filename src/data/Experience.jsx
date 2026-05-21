{experience.map((item, i) => (
  <div key={i}>
    <h3>{item.title}</h3>
    <p>{item.company}</p>
    <span>{item.period}</span>
  </div>
))}