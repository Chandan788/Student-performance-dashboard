import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import json
import warnings
warnings.filterwarnings('ignore')

# Set style for better visualizations
plt.style.use('default')
sns.set_palette("husl")

print("🧠 Cognitive Skills & Student Performance Analysis")
print("=" * 50)

# Generate synthetic student dataset
np.random.seed(42)
n_students = 150

# Generate student data with realistic correlations
student_data = {
    'student_id': [f'STU{str(i).zfill(3)}' for i in range(1, n_students + 1)],
    'name': [f'Student {i}' for i in range(1, n_students + 1)],
    'class': np.random.choice(['10A', '10B', '10C', '11A', '11B', '11C', '12A', '12B'], n_students),
    'comprehension': np.random.normal(75, 15, n_students).clip(0, 100),
    'attention': np.random.normal(70, 18, n_students).clip(0, 100),
    'focus': np.random.normal(72, 16, n_students).clip(0, 100),
    'retention': np.random.normal(78, 14, n_students).clip(0, 100),
    'engagement_time': np.random.normal(45, 12, n_students).clip(10, 90)  # minutes per day
}

# Create assessment scores with realistic correlations to cognitive skills
assessment_base = (
    0.3 * student_data['comprehension'] +
    0.25 * student_data['attention'] +
    0.2 * student_data['focus'] +
    0.25 * student_data['retention'] +
    0.1 * student_data['engagement_time'] +
    np.random.normal(0, 8, n_students)
).clip(0, 100)

student_data['assessment_score'] = assessment_base

# Create DataFrame
df = pd.DataFrame(student_data)

print(f"📊 Generated dataset with {len(df)} students")
print(f"Classes: {df['class'].unique()}")
print("\n📈 Dataset Overview:")
print(df.describe())

# Data Cleaning and EDA
print("\n🔍 Data Quality Check:")
print(f"Missing values: {df.isnull().sum().sum()}")
print(f"Duplicates: {df.duplicated().sum()}")

# Visualizations
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
fig.suptitle('Cognitive Skills Distribution Analysis', fontsize=16, fontweight='bold')

# Distribution plots
cognitive_skills = ['comprehension', 'attention', 'focus', 'retention']
for i, skill in enumerate(cognitive_skills):
    row, col = i // 2, i % 2
    axes[row, col].hist(df[skill], bins=20, alpha=0.7, color=f'C{i}')
    axes[row, col].set_title(f'{skill.title()} Distribution')
    axes[row, col].set_xlabel('Score')
    axes[row, col].set_ylabel('Frequency')

# Assessment score distribution
axes[1, 2].hist(df['assessment_score'], bins=20, alpha=0.7, color='red')
axes[1, 2].set_title('Assessment Score Distribution')
axes[1, 2].set_xlabel('Score')
axes[1, 2].set_ylabel('Frequency')

# Engagement time vs Assessment Score
axes[0, 2].scatter(df['engagement_time'], df['assessment_score'], alpha=0.6, color='green')
axes[0, 2].set_title('Engagement Time vs Assessment Score')
axes[0, 2].set_xlabel('Engagement Time (minutes)')
axes[0, 2].set_ylabel('Assessment Score')

plt.tight_layout()
plt.show()

# Correlation Analysis
print("\n🔗 Correlation Analysis:")
correlation_cols = ['comprehension', 'attention', 'focus', 'retention', 'assessment_score', 'engagement_time']
correlation_matrix = df[correlation_cols].corr()

plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, cmap='RdYlBu_r', center=0, 
            square=True, fmt='.3f', cbar_kws={'label': 'Correlation Coefficient'})
plt.title('Cognitive Skills Correlation Matrix', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("Correlation with Assessment Score:")
correlations = correlation_matrix['assessment_score'].sort_values(ascending=False)
for skill, corr in correlations.items():
    if skill != 'assessment_score':
        print(f"  {skill.title()}: {corr:.3f}")

# Predictive Model
print("\n🤖 Building Predictive Model:")
features = ['comprehension', 'attention', 'focus', 'retention', 'engagement_time']
X = df[features]
y = df['assessment_score']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

# Model evaluation
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)

print(f"Model Performance:")
print(f"  R² Score: {r2:.3f}")
print(f"  Mean Absolute Error: {mae:.3f}")
print(f"  Mean Squared Error: {mse:.3f}")

print(f"\nFeature Importance (Coefficients):")
for feature, coef in zip(features, model.coef_):
    print(f"  {feature.title()}: {coef:.3f}")

# K-means Clustering for Learning Personas
print("\n👥 Creating Learning Personas:")
clustering_features = ['comprehension', 'attention', 'focus', 'retention']
X_cluster = df[clustering_features]

# Determine optimal number of clusters (using elbow method)
inertias = []
k_range = range(2, 8)
for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_cluster)
    inertias.append(kmeans.inertia_)

# Use 4 clusters for learning personas
n_clusters = 4
kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
df['learning_persona'] = kmeans.fit_predict(X_cluster)

# Analyze personas
persona_analysis = df.groupby('learning_persona')[clustering_features + ['assessment_score', 'engagement_time']].mean()

persona_names = {
    0: "Balanced Achievers",
    1: "High-Potential Strugglers", 
    2: "Attention-Focused Learners",
    3: "Comprehensive Thinkers"
}

print("\n🎭 Learning Personas Identified:")
for persona_id in range(n_clusters):
    persona_data = persona_analysis.loc[persona_id]
    student_count = len(df[df['learning_persona'] == persona_id])
    
    print(f"\n{persona_names[persona_id]} (Persona {persona_id}) - {student_count} students:")
    print(f"  Comprehension: {persona_data['comprehension']:.1f}")
    print(f"  Attention: {persona_data['attention']:.1f}")
    print(f"  Focus: {persona_data['focus']:.1f}")
    print(f"  Retention: {persona_data['retention']:.1f}")
    print(f"  Avg Assessment Score: {persona_data['assessment_score']:.1f}")
    print(f"  Avg Engagement Time: {persona_data['engagement_time']:.1f} min")

# Visualize personas
plt.figure(figsize=(12, 8))
for persona_id in range(n_clusters):
    persona_data = df[df['learning_persona'] == persona_id]
    plt.scatter(persona_data['attention'], persona_data['assessment_score'], 
               label=f'{persona_names[persona_id]} ({len(persona_data)} students)',
               alpha=0.7, s=60)

plt.xlabel('Attention Score')
plt.ylabel('Assessment Score')
plt.title('Learning Personas: Attention vs Assessment Score')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Save processed data and model for the dashboard
print("\n💾 Saving data for dashboard...")

# Save student data
df.to_json('student_data.json', orient='records', indent=2)

# Save model coefficients and metrics
model_data = {
    'coefficients': dict(zip(features, model.coef_.tolist())),
    'intercept': model.intercept_,
    'r2_score': r2,
    'mae': mae,
    'mse': mse,
    'feature_names': features
}

with open('model_data.json', 'w') as f:
    json.dump(model_data, f, indent=2)

# Save persona analysis
persona_data = {}
for persona_id in range(n_clusters):
    persona_stats = persona_analysis.loc[persona_id].to_dict()
    persona_data[persona_id] = {
        'name': persona_names[persona_id],
        'stats': persona_stats,
        'student_count': len(df[df['learning_persona'] == persona_id])
    }

with open('persona_data.json', 'w') as f:
    json.dump(persona_data, f, indent=2)

print("✅ Analysis complete! Data saved for dashboard integration.")
print(f"📁 Files created: student_data.json, model_data.json, persona_data.json")
