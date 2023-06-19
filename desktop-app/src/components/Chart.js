
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {

  return (
    <div className="chart">
    {/* Titre du graphique */}
    <p className="chartTitle">{title}</p>
  
    {/* Conteneur responsive pour le graphique */}
    <ResponsiveContainer width="100%" aspect={4 / 1}>
      {/* Graphique en ligne */}
      <LineChart data={data}>
        {/* Axe X affichant les mois */}
        <XAxis dataKey="month" stroke="#475E1B" />
  
        {/* Ligne du graphique représentant les données */}
        <Line type="month" dataKey={dataKey} stroke="#475E1B" />
  
        {/* Infobulle affichant les valeurs au survol */}
        <Tooltip />
  
        {/* Grille en arrière-plan */}
        {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
      </LineChart>
    </ResponsiveContainer>
  </div>
  
  );
}