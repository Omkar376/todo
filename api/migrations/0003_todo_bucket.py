# Generated by Django 2.2.6 on 2019-11-03 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20191103_1247'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='bucket',
            field=models.CharField(default='default', max_length=30),
        ),
    ]