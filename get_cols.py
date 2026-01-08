
import pandas as pd
df = pd.read_csv('./data/cardio_cleaned_data.csv')
X = df.drop(columns=['cardio', 'id'])
X = pd.get_dummies(X, columns=['cholesterol', 'gluc', 'gender'], drop_first=True)
with open('cols_out.txt', 'w', encoding='utf-8') as f:
    f.write(','.join(X.columns))
