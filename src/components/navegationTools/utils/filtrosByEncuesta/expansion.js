export const toggleEncuestas = (id_sg, expandedEncuestass, setExpandedEncuestas) => {
    setExpandedEncuestas(prev => 
        prev.includes(id_sg)
        ? prev.filter(id => id !== id_sg)
        : [...prev, id_sg]
    );
};

export const toggleEncuestasArchivos = (id_sg, expandedEncuestass, setExpandedEncuestas) => {
    setExpandedEncuestas(prev => 
        prev.includes(id_sg)
        ? prev.filter(id => id !== id_sg)
        : [...prev, id_sg]
    );
};